const { Events, AttachmentBuilder } = require("discord.js");
const Canvas = require("@napi-rs/canvas");
const r = 80;

module.exports = {
  name: Events.GuildMemberAdd,
  once: false,
  async execute(member, client) {
    const wel = `Hey ${member.user}. Welcome to **${member.guild.name}**. Please go through our discord server rules:)`
    const canvas = Canvas.createCanvas(1024, 500);
            const ctx = canvas.getContext('2d');
            const background = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1202167558057508914/1202167634309943306/Untitled_design.png?ex=65cc78db&is=65ba03db&hm=e69fabcaed4bfc361c0619bc87c5eecc2a144ec1d346d77a7704447b17bbf5b3&");
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = '#C0C0C0';
            ctx.strokeRect(0, 0, canvas.width, canvas.height);

            ctx.font = 'bold 50px Times New Roman'
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'center';
            ctx.fillText(member.user.username, canvas.width / 2, canvas.height - 200);

            ctx.font = ' bold 30px Comic Sans MS'
            ctx.fillStyle = '#FFFF00';
            ctx.textAlign = 'center';
            ctx.fillText(`Welcome to ${member.guild.name}!`, canvas.width / 2, canvas.height - 150);

            ctx.font = 'bold 30px Times New Roman'
            ctx.fillStyle = '#FFFF00';
            ctx.textAlign = 'center';
            ctx.fillText(`MEMBER COUNT: ${member.guild.memberCount}`, canvas.width / 2, canvas.height - 100);

            ctx.arc(canvas.width / 2, canvas.height / 3, r+5, 0, Math.PI * 2, true);
            ctx.fillStyle = "#FFFF00";
            ctx.fill();

            const avatar = await Canvas.loadImage(member.user.displayAvatarURL());
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 3, r, 0, Math.PI * 2, true);
            ctx.clip();
            ctx.drawImage(avatar, canvas.width / 2 - r, canvas.height / 3 - r, r*2, r*2);

            const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'welcome-image.png' })
    client.channels.cache.get(client.config.welcome).send({
       content: wel,
       files: [attachment]
      });
    // console.log(member, client);
  },
};
