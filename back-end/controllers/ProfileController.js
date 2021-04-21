const { Router } = require('express');
const { ProfileUpdateService } = require('../services/ProfileService');

const ProfileController = new Router();

ProfileController.put('/update', ProfileUpdateService);

module.exports = ProfileController;