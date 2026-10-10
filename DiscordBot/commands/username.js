
const User = require("../../model/user.js");

const ALLOWED_ROLE_ID = "YOUR_ROLE_ID_HERE"; // put your donators role so basically only donators can change user ykyk

module.exports = {
    commandInfo: {
        name: "username",
        description: "Change your username.",
        options: [
            {
                name: "username",
                description: "Your new username.",
                required: true,
                type: 3
            }
        ]
    },

    execute: async (interaction) => {
        await interaction.deferReply({ ephemeral: true });
        if (
            !interaction.inGuild() ||
            !interaction.member.roles.cache.has(ALLOWED_ROLE_ID)
        ) {
            return interaction.editReply({
                content: "You do not have permission to use this command."
            });
        }

        const user = await User.findOne({
            discordId: interaction.user.id
        });

        if (!user) {
            return interaction.editReply({
                content: "You do not have a registered account!"
            });
        }

        let accessToken = global.accessTokens.find(
            i => i.accountId == user.accountId
        );

        if (accessToken) {
            return interaction.editReply({
                content: "Failed to change username as you are currently logged in to Fortnite.\nRun the /sign-out-of-all-sessions command to sign out."
            });
        }

        let username = interaction.options.get("username").value;

        if (username.length >= 25) {
            return interaction.editReply({
                content: "Your username must be less than 25 characters long."
            });
        }

        if (username.length < 3) {
            return interaction.editReply({
                content: "Your username must be at least 3 characters long."
            });
        }

        const allowedCharacters =
            (" !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~")
                .split("");

        for (let character of username) {
            if (!allowedCharacters.includes(character)) {
                return interaction.editReply({
                    content: "Your username has special characters, please remove them and try again."
                });
            }
        }

        try {
            await user.updateOne({
                $set: {
                    username: username,
                    username_lower: username.toLowerCase()
                }
            });
        } catch {
            return interaction.editReply({
                content: "This username is already in use!"
            });
        }

        return interaction.editReply({
            content: `Successfully changed your username to ${username}`
        });
    }
};