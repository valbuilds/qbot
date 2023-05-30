const { SlashCommandBuilder, EmbedBuilder } = require(`discord.js`)

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`convert`)
        .setDescription(`Converts things!`)
        .addSubcommand(subcommand => subcommand.setName(`length`).setDescription(`Converts units of length.`)
                .addStringOption(option => option.setName(`input-unit`).setDescription(`Unit to convert from.`).setRequired(true).setChoices(
                    { name: `inch/inches (in)`, value: `in` }, { name: `foot/feet (ft)`, value: `ft` }, { name: `mile/miles (mi)`, value: `mi` }, { name: `millimeter/millimeters (mm)`, value: `mm` }, { name: `centimeter/centimeters (cm)`, value: `cm` }, { name: `meter/meters (m)`, value: `m` }, { name: `kilometer/kilometers (km)`, value: `km` },
                ))
                .addIntegerOption(option => option.setName(`input-value`).setDescription(`Number of units.`).setRequired(true)))
        .addSubcommand(subcommand => subcommand.setName(`temperature`).setDescription(`Converts units of temerature.`)
                .addStringOption(option => option.setName(`input-unit`).setDescription(`Unit to convert from.`).setRequired(true).setChoices(
                    { name: `celsius (c)`, value: `c` }, { name: `farenheit (f)`, value: `f` }, { name: `kelvin (k)`, value: `k` },
                ))
                .addIntegerOption(option => option.setName(`input-value`).setDescription(`Number of units.`).setRequired(true))),
    async execute(interaction) {
        const sub = interaction.options.getSubcommand();

        const unit = interaction.options.getString(`input-unit`)
        const value = interaction.options.getInteger(`input-value`)

        if (sub === `length`) {
            convLength();
        } else if (sub === `temperature`) {
            convTemp();
        } else {
            return interaction.reply({content: `I ran into an issue.`, ephemeral: true});
        }

        async function convLength() {
            if (unit === `in`) {
                convLengthInches()
            } else if (unit === `ft`) {
                convLengthFeet()
            } else if (unit === `mi`) {
                convLengthMiles()
            } else if (unit === `mm`) {
                convLengthMillimeters()
            } else if (unit === `cm`) {
                convLengthCentimeters()
            } else if (unit === `m`) {
                convLengthMeters()
            } else if (unit === `km`) {
                convLengthKilometers()
            } else {
                return interaction.reply({content: `I ran into an issue.`, ephemeral: true});
            }

            async function convLengthInches() {
                const feet = value / 12;
                const miles = value / 63360;
                const millimeters = value * 25.4;
                const centimeters = value * 2.54;
                const meters = value / 39.37;
                const kilometers = value / 39370; // approximate

                const reply = new EmbedBuilder()
                    .setTitle(`Converting Inches (in)`)
                    .setDescription(`I was asked to convert ${value} inches.`)
                    .addFields(
                        { name: `In feet (ft)`, value: `${feet}` }, { name: `In miles (mi)`, value: `${miles}` }, { name: `In millimeters (mm)`, value: `${millimeters}` }, { name: `In centimeters (cm)`, value: `${centimeters}` }, { name: `In meters (m)`, value: `${meters}` }, { name: `In kilometers (km)`, value: `${kilometers}*` }, 
                    )
                    .setFooter({ text: `*Approximately` })
                    .setColor(`Blurple`)

                return interaction.reply({ embeds: [reply] });
            }
            async function convLengthFeet() {
                const inches = value * 12;
                const miles = value / 5280;
                const millimeters = value * 304.8;
                const centimeters = value * 30.48;
                const meters = value / 3.281; // approximate
                const kilometers = value / 3281; // approximate
                
                const reply = new EmbedBuilder()
                    .setTitle(`Converting Feet (ft)`)
                    .setDescription(`I was asked to convert ${value} feet.`)
                    .addFields(
                        { name: `In inches (in)`, value: `${inches}` }, { name: `In miles (mi)`, value: `${miles}` }, { name: `In millimeters (mm)`, value: `${millimeters}` }, { name: `In centimeters (cm)`, value: `${centimeters}` }, { name: `In meters (m)`, value: `${meters}*` }, { name: `In kilometers (km)`, value: `${kilometers}*` }, 
                    )
                    .setFooter({ text: `*Approximately` })
                    .setColor(`Blurple`)

                return interaction.reply({ embeds: [reply] });
            }
            async function convLengthMiles() {
                const inches = value * 63360;
                const feet = value * 5280;
                const millimeters = value * 1.609e+6; // approximate
                const centimeters = value * 160900; // approximate
                const meters = value * 1609; // approximate
                const kilometers = value * 1.609; // approximate
                                
                const reply = new EmbedBuilder()
                    .setTitle(`Converting Miles (mi)`)
                    .setDescription(`I was asked to convert ${value} miles.`)
                    .addFields(
                        { name: `In inches (in)`, value: `${inches}` }, { name: `In feet (ft)`, value: `${feet}` }, { name: `In millimeters (mm)`, value: `${millimeters}*` }, { name: `In centimeters (cm)`, value: `${centimeters}*` }, { name: `In meters (m)`, value: `${meters}*` }, { name: `In kilometers (km)`, value: `${kilometers}*` }, 
                    )
                    .setFooter({ text: `*Approximately` })
                    .setColor(`Blurple`)
                
                return interaction.reply({ embeds: [reply] });
            }
            async function convLengthMillimeters() {
                const inches = value / 25.4;
                const feet = value / 304.8;
                const miles = value / 1.609e+6; // approximate
                const centimeters = value / 10;
                const meters = value / 1000;
                const kilometers = value / 1e+6;
                                                
                const reply = new EmbedBuilder()
                    .setTitle(`Converting Millimeters (mm)`)
                    .setDescription(`I was asked to convert ${value} millimeters.`)
                    .addFields(
                        { name: `In inches (in)`, value: `${inches}` }, { name: `In feet (ft)`, value: `${feet}` }, { name: `In miles (mi)`, value: `${miles}*` }, { name: `In centimeters (cm)`, value: `${centimeters}` }, { name: `In meters (m)`, value: `${meters}` }, { name: `In kilometers (km)`, value: `${kilometers}` }, 
                    )
                    .setFooter({ text: `*Approximately` })
                    .setColor(`Blurple`)

                return interaction.reply({ embeds: [reply] });
            }
            async function convLengthCentimeters() {
                const inches = value / 2.54;
                const feet = value / 30.48;
                const miles = value / 160900; // approximate
                const millimeters = value * 10;
                const meters = value / 100;
                const kilometers = value / 100000;
                                                                
                const reply = new EmbedBuilder()
                    .setTitle(`Converting Centimeters (cm)`)
                    .setDescription(`I was asked to convert ${value} centimeters.`)
                    .addFields(
                        { name: `In inches (in)`, value: `${inches}` }, { name: `In feet (ft)`, value: `${feet}` }, { name: `In miles (mi)`, value: `${miles}*` }, { name: `In millimeters (mm)`, value: `${millimeters}` }, { name: `In meters (m)`, value: `${meters}` }, { name: `In kilometers (km)`, value: `${kilometers}` }, 
                    )
                    .setFooter({ text: `*Approximately` })
                    .setColor(`Blurple`)

                return interaction.reply({ embeds: [reply] });
            }
            async function convLengthMeters() {
                const inches = value * 39.37;
                const feet = value * 3.281; // approximate
                const miles = value * 1609; // approximate
                const millimeters = value * 1000;
                const centimeters = value * 100;
                const kilometers = value / 1000;
                                                                                
                const reply = new EmbedBuilder()
                    .setTitle(`Converting Meters (m)`)
                    .setDescription(`I was asked to convert ${value} meters.`)
                    .addFields(
                        { name: `In inches (in)`, value: `${inches}` }, { name: `In feet (ft)`, value: `${feet}*` }, { name: `In miles (mi)`, value: `${miles}*` }, { name: `In millimeters (mm)`, value: `${millimeters}` }, { name: `In centimeters (cm)`, value: `${centimeters}` }, { name: `In kilometers (km)`, value: `${kilometers}` }, 
                    )
                    .setFooter({ text: `*Approximately` })
                    .setColor(`Blurple`)

                return interaction.reply({ embeds: [reply] });
            }
            async function convLengthKilometers() {
                const inches = value * 39370; // approximate
                const feet = value * 3281; // approximate
                const miles = value / 1.609; // approximate
                const millimeters = value * 1e+6;
                const centimeters = value * 100000;
                const meters = value * 1000;
                                                                                                
                const reply = new EmbedBuilder()
                    .setTitle(`Converting Kilometers (km)`)
                    .setDescription(`I was asked to convert ${value} kilometers.`)
                    .addFields(
                        { name: `In inches (in)`, value: `${inches}` }, { name: `In feet (ft)`, value: `${feet}*` }, { name: `In miles (mi)`, value: `${miles}*` }, { name: `In millimeters (mm)`, value: `${millimeters}` }, { name: `In centimeters (cm)`, value: `${centimeters}` }, { name: `In meters (m)`, value: `${meters}` }, 
                    )
                    .setFooter({ text: `*Approximately` })
                    .setColor(`Blurple`)

                return interaction.reply({ embeds: [reply] });
            }
        }
    }
}