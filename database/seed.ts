import { v4 as uuidv4 } from 'uuid';

export const seedFiles = async (files) => {
  const count = (await files.find({}).exec()).length;
  if (count > 0) return;

  console.info('Seeding database...');

  const results = await files.insert({
    id: uuidv4(),
    fileName: 'file 1ab',
    uploadedAt: Date.now().toString(),
  });

  await files.insert({
    id: uuidv4(),
    fileName: 'file_1ab_long_name_here_more_text_in_name',
    uploadedAt: Date.now().toString(),
  });

  console.info('Database seeded');
  return results;
}
