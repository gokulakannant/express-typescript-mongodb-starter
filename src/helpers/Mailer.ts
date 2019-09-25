import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";
import settings from "../config/Settings";
import { SmptInfo } from "types";
import logger from "../helpers/Logger";

const SMTP_FROM_CONFIG_FILE: SmptInfo = {
    host: settings.smtpServer.host,
    port: settings.smtpServer.port,
    secure: settings.smtpServer.secure,
    auth: {
        user: settings.smtpServer.user,
        pass: settings.smtpServer.pass
    }
};

class Mailer {
    /**
     * A static method to expose the smtp server configurations
     *
     * @param emailSettings
     */
    static getSmtpFromEmailSettings(emailSettings: any): SmptInfo {
        return {
            host: emailSettings.host,
            port: emailSettings.port,
            secure: emailSettings.port === 465,
            auth: {
                user: emailSettings.user,
                pass: emailSettings.pass
            }
        };
    }

    /**
     * Get smpt info as per node mailer input
     *
     * @param emailSettings
     */
    private getSmtp(emailSettings: any): SmptInfo {
        const useSmtpServerFromConfigFile = emailSettings.host === "";
        const smtp = useSmtpServerFromConfigFile
            ? SMTP_FROM_CONFIG_FILE
            : Mailer.getSmtpFromEmailSettings(emailSettings);

        return smtp;
    }

    /**
     * Get from info
     *
     * @param emailSettings
     */
    private getFrom(emailSettings: any): string {
        const useSmtpServerFromConfigFile = emailSettings.host === "";
        return useSmtpServerFromConfigFile
            ? `"${settings.smtpServer.fromName}" <${settings.smtpServer.fromAddress}>`
            : `"${emailSettings.from_name}" <${emailSettings.from_address}>`;
    }

    /**
     * Actual mail sender, which send mail using node mailer
     *
     * @param smtp
     * @param message
     */
    private sendMail(smtp: any, message: any): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!message.to.includes("@")) {
                reject("Invalid email address");
                return;
            }

            const transporter = nodemailer.createTransport(smtpTransport(smtp));
            transporter.sendMail(message, (err: any, info: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(info);
                }
            });
        });
    }

    /**
     * Public method used to send the mail.
     * This method can accessible across the application
     *
     * @param message
     */
    async send(message: any) {
        // TODO:: Need to fetch the smpt setting from the database
        const emailSettings = settings.smtpServer;
        const smtp = this.getSmtp(emailSettings);
        message.from = this.getFrom(emailSettings);

        try {
            logger.info(JSON.stringify(smtp));
            const result = await this.sendMail(smtp, message);
            logger.info(`Email sent, ${result}`);
            return true;
        } catch (e) {
            logger.error(`Email send failed ${e}`);
            return false;
        }
    }
}

export default new Mailer();
