import fs from "node:fs";

import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

export const getMeals = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // throw new Error("Loading meals failed");

  return db.prepare("SELECT * FROM meals").all();
};

export const getMeal = async (mealSlug) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return db.prepare(`SELECT * FROM meals WHERE slug =?`).get(mealSlug);
};

export const saveMeal = async (meal) => {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const exaction = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${exaction}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed!");
    }
  });

  meal.image = `/images/${fileName}`;

  db.prepare(`
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
      VALUES (
        @title,
        @summary,
        @instructions,
        @creator,
        @creator_email,
        @image,
        @slug
      )
    `).run(meal);
};
