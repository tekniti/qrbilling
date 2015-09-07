deploy:
	ENV='staging' gulp build
	ionic build android
	ionic build ios
	ionic upload
