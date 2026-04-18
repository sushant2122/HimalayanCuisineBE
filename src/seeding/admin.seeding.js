const bcrypt = require("bcryptjs");

async function seedAdminUser(userModel) {
    try {

        const password = bcrypt.hashSync("admin", 10);

        const existingAdmin = await userModel.findOne({
            where: { role_title: 'Admin' }
        });

        if (existingAdmin) {
            throw new Error("⚠️ Admin user already exists. Seeding aborted.");
        }

        await userModel.create({
            full_name: 'Sushant Paudyal',
            email: 'sushantpaudyal@gmail.com',
            password: password,
            address: 'Kausalthar, Bhaktapur',
            role_title: 'Admin',
            is_verified: true,
            contact_number: '9861200112',
            date_joined: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        console.log('✅ Admin user seeded successfully!');
    } catch (error) {
        // console.error('❌ Error seeding admin user:', error.message);
    }
}

module.exports = { seedAdminUser };
