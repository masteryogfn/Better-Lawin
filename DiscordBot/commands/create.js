const { MessageEmbed } = require("discord.js");
const crypto = require("crypto");
const functions = require("../../structs/functions.js");

module.exports = {
    commandInfo: {
        name: "create",
        description: "Creates your account at Better Lawin!",
        options: [],
    },

    execute: async (interaction) => {
        await interaction.deferReply({ ephemeral: true });

        const discordUser = interaction.user;
        const discordId = discordUser.id;

        const safeUsername = discordUser.username
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "")
            .slice(0, 20) || "user";

        const username = safeUsername;
        const email = `${safeUsername}@gmail.com`;
        const password =
            crypto.randomBytes(12).toString("base64url") + "A1!";

        try {
            const resp = await functions.registerUser(
                discordId,
                username,
                email,
                password
            );

            const embed = new MessageEmbed()
                .setColor(resp.status >= 400 ? "#ff0000" : "#56ff00")
                .setAuthor({
                    name: discordUser.tag,
                    iconURL: discordUser.avatarURL()
                })
                .setTitle(
                    resp.status >= 400
                        ? "Account Creation Failed"
                        : "Your Better Lawin Account"
                )
                .setDescription(resp.message)
                .setTimestamp();

            if (resp.status >= 400) {
                return interaction.editReply({
                    embeds: [embed]
                });
            }

            const credentialsEmbed = new MessageEmbed()
                .setColor("#00c3ff")
                .setTitle("Your Better Lawin Account")
                .setDescription(
                    "Your account was created successfully! Keep these credentials private."
                )
                .addFields(
                    { name: "Email", value: email },
                    { name: "Username", value: username },
                    { name: "Password", value: `||${password}||` }
                )
                .setFooter({
                    text: "Keep your password safe and do not share it."
                })
                .setTimestamp();

            try {
                await discordUser.send({
                    embeds: [credentialsEmbed]
                });

                await interaction.editReply({
                    content: "Your account was created successfully! I've sent your login details to your DMs."
                });
            } catch (dmError) {
                await interaction.editReply({
                    content:
                        "Your account was created, but I couldn't DM you. Please enable direct messages from this server and contact an administrator to retrieve your credentials securely."
                });
            }
        } catch (error) {
            console.error("Account creation error:", error);

            await interaction.editReply({
                content: "An error occurred while creating your account. Please try again later."
            });
        }
    }
};