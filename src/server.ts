import app from './app';
import { MikroORM } from '@mikro-orm/core';
import config from './miro.config';
const PORT = 3000;

app.listen(PORT, async () => {
    await MikroORM.init(config);
    console.log(`Server is running on http://localhost:${PORT}`);
});
