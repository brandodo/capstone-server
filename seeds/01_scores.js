/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("scores").del();
  await knex("scores").insert([
    {
      id: 1,
      player_id: "brandonong93",
      song: "Would You",
      artist: "Madd3e",
      score: 28600,
      updated_at: "2022-04-27 00:14:57",
      max_combo: 23,
    },
    {
      id: 2,
      player_id: "brandonong93",
      song: "Raingurl",
      artist: "Yaeji",
      score: 62600,
      updated_at: "2022-04-27 00:28:41",
      max_combo: 2,
    },
    {
      id: 3,
      player_id: "brandonong93",
      song: "Nice For What",
      artist: "Drake",
      score: 33200,
      updated_at: "2022-04-27 01:30:07",
      max_combo: 43,
    },
    {
      id: 4,
      player_id: "brandonong93",
      song: "Meet Me At Our Spot",
      artist: "THE ANXIETY",
      score: 23200,
      updated_at: "2022-04-27 01:34:10",
      max_combo: 40,
    },
    {
      id: 5,
      player_id: "brandonong93",
      song: "Numb / Encore",
      artist: "JAY-Z",
      score: 33600,
      updated_at: "2022-04-27 01:38:23",
      max_combo: 36,
    },
    {
      id: 6,
      player_id: "brandonong93",
      song: "Would You",
      artist: "Madd3e",
      score: 30000,
      updated_at: "2022-04-27 01:42:23",
      max_combo: 90,
    },
    {
      id: 7,
      player_id: "brandonong93",
      song: "California Love - Original Version",
      artist: "2Pac",
      score: 47400,
      updated_at: "2022-04-27 01:47:46",
      max_combo: 42,
    },
    {
      id: 8,
      player_id: "brandonong93",
      song: "Dancing in the Moonlight",
      artist: "Toploader",
      score: 40800,
      updated_at: "2022-04-27 01:52:15",
      max_combo: 9,
    },
    {
      id: 9,
      player_id: "brandonong93",
      song: "September",
      artist: "Earth, Wind & Fire",
      score: 45600,
      updated_at: "2022-04-27 01:58:19",
      max_combo: 39,
    },
    {
      id: 10,
      player_id: "brandonong93",
      song: "edamame (feat. Rich Brian)",
      artist: "bbno$",
      score: 25200,
      updated_at: "2022-04-27 02:01:14",
      max_combo: 73,
    },
    {
      id: 11,
      player_id: "brandonong93",
      song: "Would You",
      artist: "Madd3e",
      score: 30000,
      updated_at: "2022-04-27 16:54:35",
      max_combo: 47,
    },
    {
      id: 12,
      player_id: "brandonong93",
      song: "Would You",
      artist: "Madd3e",
      score: 29600,
      updated_at: "2022-04-27 18:07:19",
      max_combo: 57,
    },
    {
      id: 13,
      player_id: "brandonong93",
      song: "Passionfruit",
      artist: "Yaeji",
      score: 47800,
      updated_at: "2022-04-27 18:14:52",
      max_combo: 27,
    },
    {
      id: 14,
      player_id: "brandonong93",
      song: "edamame (feat. Rich Brian)",
      artist: "bbno$",
      score: 25600,
      updated_at: "2022-04-27 18:20:23",
      max_combo: 82,
    },
    {
      id: 15,
      player_id: "brandonong93",
      song: "Jane",
      artist: "Jefferson Starship",
      score: 40000,
      updated_at: "2022-04-27 18:25:02",
      max_combo: 28,
    },
    {
      id: 16,
      player_id: "brandonong93",
      song: "All Star",
      artist: "Smash Mouth",
      score: 34600,
      updated_at: "2022-04-27 18:43:15",
      max_combo: 64,
    },
    {
      id: 17,
      player_id: "brandonong93",
      song: "Nah (feat. Sinead Harnett)",
      artist: "Sonny Fodera",
      score: 33600,
      updated_at: "2022-04-27 18:55:47",
      max_combo: 23,
    },
    {
      id: 18,
      player_id: "brandonong93",
      song: "Miyazaki",
      artist: "Gallant",
      score: 16000,
      updated_at: "2022-04-27 19:00:15",
      max_combo: 31,
    },
    {
      id: 19,
      player_id: "brandonong93",
      song: "Weight in Gold",
      artist: "Gallant",
      score: 42200,
      updated_at: "2022-04-27 19:03:56",
      max_combo: 13,
    },
    {
      id: 20,
      player_id: "brandonong93",
      song: "Mother Tongue (Live Performance) [Alex Kade Edit]",
      artist: "Alex Kade",
      score: 44000,
      updated_at: "2022-04-27 19:10:36",
      max_combo: 65,
    },
    {
      id: 21,
      player_id: "brandonong93",
      song: "Know Me Better",
      artist: "Madd3e",
      score: 36400,
      updated_at: "2022-04-27 19:20:09",
      max_combo: 12,
    },
    {
      id: 22,
      player_id: "brandonong93",
      song: "The Cool Kids - MadD3E Remix",
      artist: "BVRGER",
      score: 35200,
      updated_at: "2022-04-27 19:50:34",
      max_combo: 21,
    },
    {
      id: 23,
      player_id: "brandonong93",
      song: "Would You",
      artist: "Madd3e",
      score: 29800,
      updated_at: "2022-04-27 20:36:50",
      max_combo: 20,
    },
    {
      id: 24,
      player_id: "brandonong93",
      song: "Meet Me At Our Spot",
      artist: "THE ANXIETY",
      score: 22200,
      updated_at: "2022-04-27 20:40:07",
      max_combo: 4,
    },
    {
      id: 25,
      player_id: "brandonong93",
      song: "If You Let Me",
      artist: "Sin??ad Harnett",
      score: 36400,
      updated_at: "2022-04-27 22:15:48",
      max_combo: 6,
    },
    {
      id: 26,
      player_id: "brandonong93",
      song: "Bra Bra",
      artist: "Madd3e",
      score: 47800,
      updated_at: "2022-04-27 22:22:21",
      max_combo: 29,
    },
    {
      id: 27,
      player_id: "brandonong93",
      song: "Would You",
      artist: "Madd3e",
      score: 29000,
      updated_at: "2022-04-27 22:53:01",
      max_combo: 46,
    },
    {
      id: 28,
      player_id: "brandonong93",
      song: "Raingurl",
      artist: "Yaeji",
      score: 63000,
      updated_at: "2022-04-27 23:08:34",
      max_combo: 31,
    },
    {
      id: 29,
      player_id: "brandonong93",
      song: "edamame (feat. Rich Brian)",
      artist: "bbno$",
      score: 24800,
      updated_at: "2022-04-27 23:32:13",
      max_combo: 11,
    },
    {
      id: 30,
      player_id: "brandonong93",
      song: "Wow.",
      artist: "Post Malone",
      score: 24400,
      updated_at: "2022-04-27 23:48:20",
      max_combo: 19,
    },
    {
      id: 31,
      player_id: "brandonong93",
      song: "Would You",
      artist: "Madd3e",
      score: 29000,
      updated_at: "2022-04-28 00:10:28",
      max_combo: 29,
    },
    {
      id: 32,
      player_id: "brandonong93",
      song: "Would You",
      artist: "Madd3e",
      score: 29000,
      updated_at: "2022-04-28 01:21:45",
      max_combo: 10,
    },
    {
      id: 33,
      player_id: "brandonong93",
      song: "Come Down",
      artist: "Anderson .Paak",
      score: 29800,
      updated_at: "2022-04-28 01:31:37",
      max_combo: 23,
    },
    {
      id: 34,
      player_id: "brandonong93",
      song: "lvl UP",
      artist: "Madd3e",
      score: 24800,
      updated_at: "2022-04-28 16:22:13",
      max_combo: 10,
    },
    {
      id: 35,
      player_id: "brandonong93",
      song: "lvl UP",
      artist: "Madd3e",
      score: 25000,
      updated_at: "2022-04-28 16:30:25",
      max_combo: 4,
    },
    {
      id: 36,
      player_id: "brandonong93",
      song: "Velours",
      artist: "Anomalie",
      score: 60600,
      updated_at: "2022-04-28 16:35:05",
      max_combo: 3,
    },
    {
      id: 37,
      player_id: "brandonong93",
      song: "Velours",
      artist: "Anomalie",
      score: 60800,
      updated_at: "2022-04-28 16:39:32",
      max_combo: 102,
    },
    {
      id: 38,
      player_id: "brandonong93",
      song: "Sugar, We're Goin Down",
      artist: "Fall Out Boy",
      score: 46000,
      updated_at: "2022-04-28 16:44:24",
      max_combo: 43,
    },
    {
      id: 39,
      player_id: "brandonong93",
      song: "Velours",
      artist: "Anomalie",
      score: 61600,
      updated_at: "2022-04-28 17:10:37",
      max_combo: 43,
    },
    {
      id: 40,
      player_id: "brandonong93",
      song: "Meet Me At Our Spot",
      artist: "THE ANXIETY",
      score: 21400,
      updated_at: "2022-04-28 17:46:13",
      max_combo: 75,
    },
  ]);
};
