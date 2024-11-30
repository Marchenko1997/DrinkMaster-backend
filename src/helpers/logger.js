import winston from 'winston';
import Transport from 'winston-transport';
import axios from 'axios';

class BetterStackTransport extends Transport {
  constructor(opts) {
    super(opts);
    this.url = 'https://in.logs.betterstack.com/';
    this.token = opts.token;
  }

  log(info, callback) {
    setImmediate(() => this.emit('logged', info));

    axios
      .post(
        this.url,
        {
          level: info.level,
          message: info.message,
          timestamp: new Date().toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(() => callback())
      .catch((error) => {
        console.error('Ошибка отправки логов:', error.message);
        callback(error);
      });
  }
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(), // Логирование в консоль
    new BetterStackTransport({
      token: 'QnsDyqjvaombNEjwqJ8xba1P', // Ваш токен из Better Stack
    }),
  ],
});

export default logger;
