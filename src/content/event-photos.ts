import type { ImageAsset } from "@/types/content";

import { pexels } from "./sources";

/**
 * Event photography for the events-first design: licensed Pexels stock (free for commercial
 * use, no attribution required — https://www.pexels.com/license/).
 *
 * These photos set the scene for each kind of event the company delivers. They are never
 * presented as Viral Concepts' own projects, team or venues: work, case studies and galleries
 * only ever use the client's own photos (see content/projects.ts and `isProofImage`).
 *
 * Swapping a photo: replace the entry with the client's own photo in /public/images/events/
 * (e.g. `src: "/images/events/gala.jpg"`, real width and height, `kind: "project-photo"` only
 * if it shows their delivered work and they approved it). Every entry links to its Pexels page
 * so each one can be reviewed before launch.
 */
const SIZE = "?auto=compress&cs=tinysrgb&w=2400";

function photo(
  id: number,
  alt: string,
  [width, height]: readonly [number, number],
  pageUrl: `https://www.pexels.com/photo/${string}`,
  photographer: string,
): ImageAsset {
  return {
    src: `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg${SIZE}`,
    alt,
    width,
    height,
    kind: "stock-photo",
    status: "live",
    verified: true,
    source: pexels(pageUrl, photographer),
  };
}

export const eventPhotos = {
  /* -------------------------------------------------- Homepage hero scenes */
  stageConfetti: photo(
    22555266,
    "A crowd under bright stage lights as yellow confetti falls",
    [6720, 4480],
    "https://www.pexels.com/photo/yellow-confetti-over-crowd-at-concert-22555266/",
    "Máté Lakatos",
  ),
  conferenceAuditorium: photo(
    9275222,
    "An audience in a dark auditorium watching a presenter on a lit stage",
    [6000, 4000],
    "https://www.pexels.com/photo/people-sitting-inside-the-auditorium-9275222/",
    "Atlantic Ambience",
  ),
  banquetStage: photo(
    14646741,
    "A banquet hall with dressed round tables, chandeliers and colourful stage lighting",
    [6123, 3660],
    "https://www.pexels.com/photo/photo-of-an-empty-party-hall-prepared-for-a-party-14646741/",
    "Vidal Balielo Jr.",
  ),
  exhibitionAerial: photo(
    37503303,
    "Overhead view of a busy exhibition floor with rows of stands",
    [6124, 4083],
    "https://www.pexels.com/photo/aerial-view-of-indoor-exhibition-in-taipei-37503303/",
    "Derek Tsai",
  ),
  laserShow: photo(
    13146328,
    "Laser beams sweeping over a crowd at an indoor show",
    [6016, 4016],
    "https://www.pexels.com/photo/crowd-of-people-watching-a-concert-13146328/",
    "Isabella Mendes",
  ),

  /* ------------------------------------------------------ Kinds of event */
  galaHall: photo(
    35042459,
    "An event hall with a stage, crystal chandeliers and set dinner tables in lavender light",
    [6119, 3645],
    "https://www.pexels.com/photo/elegant-themed-event-hall-setup-with-stage-35042459/",
    "Ernesto RƎIƎZ",
  ),
  conferenceAudience: photo(
    35064539,
    "A packed auditorium seen from behind, facing the stage",
    [4240, 2832],
    "https://www.pexels.com/photo/crowded-indoor-auditorium-hosting-large-event-35064539/",
    "Matheus Amaral",
  ),
  tradeShow: photo(
    35138560,
    "Visitors walking between built stands in a modern exhibition hall",
    [6000, 4000],
    "https://www.pexels.com/photo/modern-trade-show-exhibition-with-busy-attendees-35138560/",
    "Tahir Xəlfəquliyev",
  ),
  immersiveScreens: photo(
    10508110,
    "Visitors in front of large illuminated screens at an immersive experience",
    [6000, 3368],
    "https://www.pexels.com/photo/people-in-front-of-screens-in-museum-10508110/",
    "Han Zibar",
  ),
  ramadanLanterns: photo(
    36319678,
    "Colourful glass lanterns displayed in a shopping mall during Ramadan",
    [4330, 2575],
    "https://www.pexels.com/photo/colorful-lanterns-in-abu-dhabi-ramadan-celebration-36319678/",
    "Naseeh",
  ),
  festiveMall: photo(
    19840969,
    "A shopping mall atrium with chandeliers, a glass roof and festive lights",
    [5590, 3727],
    "https://www.pexels.com/photo/christmas-decoration-in-shopping-mall-19840969/",
    "Mario Spencer",
  ),
  concertAerial: photo(
    3924175,
    "Aerial view of a large night crowd in front of an illuminated stage",
    [5308, 3000],
    "https://www.pexels.com/photo/aerial-shot-of-people-watching-a-concert-3924175/",
    "Tom Fisk",
  ),
  marathon: photo(
    29840338,
    "Runners racing along a tree-lined street on a foggy morning",
    [5072, 3381],
    "https://www.pexels.com/photo/runners-competing-in-a-morning-marathon-race-29840338/",
    "Stephen Leonardi",
  ),
  outdoorCinema: photo(
    35069835,
    "People on a meadow at twilight watching an outdoor screen",
    [5212, 3468],
    "https://www.pexels.com/photo/outdoor-evening-movie-screening-in-forest-35069835/",
    "Daniil Ustinov",
  ),
  desertCamp: photo(
    18767559,
    "A desert camp seating area with traditional tents, floor cushions and lanterns",
    [8192, 5464],
    "https://www.pexels.com/photo/remote-desert-village-18767559/",
    "Christophe RASCLE",
  ),
  ledStage: photo(
    17315442,
    "An indoor stage with a DJ booth against glowing green LED panels",
    [6413, 4275],
    "https://www.pexels.com/photo/stage-with-dj-booth-17315442/",
    "Matheus Bertelli",
  ),
  ballroom: photo(
    12689009,
    "An empty ballroom with set tables, candelabras, florals and chandeliers",
    [5472, 3648],
    "https://www.pexels.com/photo/view-of-a-ballroom-12689009/",
    "Vidal Balielo Jr.",
  ),

  /* -------------------------------------------- Behind the scenes / process */
  planningTable: photo(
    8485870,
    "Overhead view of a planning meeting with coffee, a laptop and notebooks",
    [6467, 4311],
    "https://www.pexels.com/photo/people-sitting-at-the-wooden-coffee-table-with-drinks-and-laptop-8485870/",
    "Thirdman",
  ),
  designRender: photo(
    3862372,
    "A designer, seen from behind, working on a 3D model on screen",
    [6122, 3872],
    "https://www.pexels.com/photo/female-engineer-designing-theme-park-ride-3862372/",
    "ThisIsEngineering",
  ),
  drawingsReview: photo(
    8000537,
    "Two people reviewing technical drawings together at a worktable",
    [5192, 3466],
    "https://www.pexels.com/photo/persons-holding-pens-on-paper-8000537/",
    "Pavel Danilyuk",
  ),
  welding: photo(
    5846282,
    "A welder working amid sparks in a dimly lit workshop",
    [6000, 4000],
    "https://www.pexels.com/photo/person-in-safety-jacket-holding-welding-machine-5846282/",
    "Tima Miroshnichenko",
  ),
  cncRouter: photo(
    10119312,
    "A CNC machine cutting a wooden panel in a workshop",
    [4082, 2544],
    "https://www.pexels.com/photo/lathe-cutting-a-piece-of-wood-board-10119312/",
    "Harold Granados",
  ),
  fabricPrinter: photo(
    5727002,
    "A wide-format printer printing a colourful design onto fabric",
    [3260, 2173],
    "https://www.pexels.com/photo/close-up-of-a-printed-photo-5727002/",
    "Deybson Mallony",
  ),
  ledInstall: photo(
    7513419,
    "A silhouetted technician installing an LED screen on a stage",
    [6124, 3749],
    "https://www.pexels.com/photo/unrecognizable-workman-installing-digital-screen-on-stage-7513419/",
    "Bence Szemerey",
  ),
  backstageCrew: photo(
    11410604,
    "A backstage crew setting up equipment before a live event",
    [5000, 4000],
    "https://www.pexels.com/photo/sound-crew-at-the-backstage-11410604/",
    "Lloyd James",
  ),
  soundDesk: photo(
    2952834,
    "A silhouetted sound engineer at a mixing console during a live show",
    [5977, 4016],
    "https://www.pexels.com/photo/silhouette-photo-of-people-beside-monitor-2952834/",
    "Marc Schulte",
  ),
  applause: photo(
    19943363,
    "A silhouetted crowd clapping under vibrant stage lights",
    [6000, 4002],
    "https://www.pexels.com/photo/crowd-at-concert-19943363/",
    "Barbara Batári",
  ),
  emptyStage: photo(
    2020432,
    "An empty stage with coloured spotlights cutting through haze",
    [6000, 4000],
    "https://www.pexels.com/photo/photo-of-colored-spotlights-2020432/",
    "David Rama",
  ),
  dubaiSkyline: photo(
    11403884,
    "The Downtown Dubai skyline with the Burj Khalifa at twilight",
    [5435, 3623],
    "https://www.pexels.com/photo/city-skyline-at-night-11403884/",
    "Kirandeep Singh Walia",
  ),
  /* --------------------------------------------- Branding & print products */
  flagsSky: photo(
    37225041,
    "Colourful printed flags fluttering against a bright blue sky",
    [3936, 2624],
    "https://www.pexels.com/photo/colorful-flags-fluttering-against-a-clear-blue-sky-37225041/",
    "Jan van der Wolf",
  ),
  blankBanner: photo(
    12883028,
    "A large blank white banner mounted on a red brick wall",
    [6000, 4000],
    "https://www.pexels.com/photo/a-blank-banner-on-a-brick-wall-12883028/",
    "Leonid Altman",
  ),
  printRolls: photo(
    716272,
    "A man checking rolls of large format prints in a print studio",
    [6000, 4000],
    "https://www.pexels.com/photo/man-standing-in-front-of-photo-stands-716272/",
    "祝 鹤槐",
  ),
  neonSign: photo(
    942317,
    "A glowing illuminated sign mounted on a colourful geometric wall",
    [9000, 6000],
    "https://www.pexels.com/photo/photo-of-led-signage-on-the-wall-942317/",
    "Tim Mossholder",
  ),
  fabricRolls: photo(
    20531147,
    "Rolls of patterned printed fabric stacked on shelves",
    [6000, 4000],
    "https://www.pexels.com/photo/stack-of-fabrics-20531147/",
    "Bem Partington",
  ),
  carWrap: photo(
    6025950,
    "Installers applying a vinyl wrap to a modern car in a workshop",
    [5184, 3456],
    "https://www.pexels.com/photo/men-putting-white-cover-on-modern-car-6025950/",
    "Orhun Rüzgar ÖZ",
  ),
  printedStacks: photo(
    19843566,
    "A person sorting stacks of freshly printed brochures and magazines",
    [5472, 3648],
    "https://www.pexels.com/photo/man-looking-at-new-printed-papers-19843566/",
    "wutthichai charoenburi",
  ),
  screenPrinting: photo(
    27893067,
    "A printer pulling ink across a screen to print apparel in a workshop",
    [6720, 4480],
    "https://www.pexels.com/photo/a-man-is-working-on-a-screen-printing-machine-27893067/",
    "HONG SON",
  ),
} as const satisfies Record<string, ImageAsset>;
