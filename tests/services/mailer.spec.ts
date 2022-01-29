import { mailer } from '../../src/services/mail';

describe('Mailer Service', () => {
  it('should send via gmail', async () => {
    if (process.env.ENABLE_EMAIL_SENDING) {
      const { rejected } = await mailer.sendMail({
        from: '"Breech Oracion 🤭" <oracionbreech@gmail.com>', // sender address
        to: 'oracionbre@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
      });
      expect(rejected).toEqual([]);
    }
  });
});
