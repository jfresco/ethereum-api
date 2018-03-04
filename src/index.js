/**
 * App entry point
 */

import app from './app';
import config from './config.json';

// Kick start the server
app.server.listen(process.env.PORT || config.port, () => {
	console.log(`Started on port ${app.server.address().port}`);
});
