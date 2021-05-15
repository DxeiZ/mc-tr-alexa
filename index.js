const puppeteer = require("puppeteer");
const Discord = require("discord.js")
const client = new Discord.Client();

client.on("ready", () => {
    client.user.setPresence({
        status: 'idle',
        activity: {
            name: `MC-TR Alexa`
        }
    })
    console.log(client.ws.ping);
    console.log('Sistem hazır!');
})

client.on('message', async message => {
    if(message.content.toLowerCase() === "!alexa") {
        if(message.member.permissions.has("MANAGE_GUILD")) {
            try {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.goto('https://www.alexa.com/siteinfo/mc-tr.com#section_traffic');
                await page.screenshot({ path: 'mc-tr-alexa.png' })
                await browser.close().then(() => {
                    const attachment = new Discord.MessageAttachment('./mc-tr-alexa.png')
                    message.channel.send(attachment)
                })
                } catch (error) {
                    message.channel.send("Lütfen tekrar deneyin, dosya oluşturulamadı.")
                }
            setInterval(async () => {
                try {
                    const browser = await puppeteer.launch();
                    const page = await browser.newPage();
                    await page.goto('https://www.alexa.com/siteinfo/mc-tr.com#section_traffic');
                    await page.screenshot({ path: 'mc-tr-alexa.png' })
                    await browser.close().then(() => {
                        const attachment = new Discord.MessageAttachment('./mc-tr-alexa.png').catch(() => {message.channel.send("Lütfen tekrar deneyin, dosya oluşturulamadı.")})
                        message.channel.send(attachment).catch(() => {message.channel.send("Lütfen tekrar deneyin, dosya oluşturulamadı.")})
                    })
                    } catch (error) {
                        message.channel.send("Lütfen tekrar deneyin, dosya oluşturulamadı.")
                    }
            }, 86400000);
        }
    }
})

client.login("ODQxMDM4NjE2OTg5MDA3ODky.YJg8QA.Wbxb5761_Tkla_5nIbJUd9viyc0")