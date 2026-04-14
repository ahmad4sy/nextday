import { prisma } from './src/lib/prisma';
import { hashPassword } from './src/lib/utils';

async function main() {
  console.log('Starting database seed...');

  // Create default admin user
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@ahmadshehadi.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123456';

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (!existingUser) {
      const hashedPassword = await hashPassword(adminPassword);
      const user = await prisma.user.create({
        data: {
          email: adminEmail,
          password: hashedPassword,
        },
      });
      console.log(`✅ Admin user created: ${user.email}`);
    } else {
      console.log(`✅ Admin user already exists: ${adminEmail}`);
    }

    // Create sample post
    const existingPost = await prisma.post.findUnique({
      where: { slug: 'welcome' },
    });

    if (!existingPost) {
      const post = await prisma.post.create({
        data: {
          title: 'مرحباً بك في مدونتي',
          slug: 'welcome',
          content: 'هذه أول مقالة في مدونتي. يمكنك البدء بإضافة المزيد من المقالات من لوحة التحكم.',
          published: true,
        },
      });
      console.log(`✅ Sample post created: ${post.title}`);
    }

    console.log('✅ Database seed completed successfully!');
  } catch (error) {
    console.error('Error during seed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
