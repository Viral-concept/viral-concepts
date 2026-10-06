import type { ImageAsset } from "@/types/content";

import { pexels } from "../sources";

/**
 * Supporting photos for the digital service pages: licensed Pexels stock (free for commercial
 * use, no attribution required — https://www.pexels.com/license/). They illustrate the kind of
 * work; they are never presented as Viral Concepts' own team, office or delivered projects.
 *
 * To use your own photo instead, put it in /public/images/digital/ and point `src` at it, e.g.
 * `src: "/images/digital/web-development.jpg"`, with its real width and height.
 */
const SIZE = "?auto=compress&cs=tinysrgb&w=1600";

function photo(
  id: number,
  file: "jpeg" | "png",
  alt: string,
  [width, height]: readonly [number, number],
  pageUrl: `https://www.pexels.com/photo/${string}`,
  photographer: string,
): ImageAsset {
  return {
    src: `https://images.pexels.com/photos/${id}/pexels-photo-${id}.${file}${SIZE}`,
    alt,
    width,
    height,
    kind: "stock-photo",
    status: "live",
    verified: true,
    source: pexels(pageUrl, photographer),
  };
}

export const digitalPhotos = {
  webDevelopment: photo(
    35184837,
    "jpeg",
    "A web developer working on a laptop in a modern office",
    [6000, 4000],
    "https://www.pexels.com/photo/professional-web-developer-at-work-in-office-35184837/",
    "Masud Gaanwala",
  ),
  applicationDevelopment: photo(
    4549418,
    "jpeg",
    "A woman using an app on her smartphone outdoors",
    [6720, 4480],
    "https://www.pexels.com/photo/person-using-smartphone-application-4549418/",
    "Plann",
  ),
  seo: photo(
    12969403,
    "jpeg",
    "A laptop showing an analytics dashboard with charts",
    [6000, 4000],
    "https://www.pexels.com/photo/close-up-shot-of-a-laptop-computer-12969403/",
    "Atlantic Ambience",
  ),
  socialMedia: photo(
    8359955,
    "jpeg",
    "A man recording a video of himself on a smartphone mounted on a tripod",
    [4328, 6492],
    "https://www.pexels.com/photo/a-man-filming-himself-using-his-mobile-phone-8359955/",
    "Ron Lach",
  ),
  performanceMarketing: photo(
    265087,
    "jpeg",
    "A laptop with charts and graphs beside a tablet showing a calendar",
    [5184, 3456],
    "https://www.pexels.com/photo/business-charts-commerce-computer-265087/",
    "Pixabay",
  ),
  contentStrategy: photo(
    5387268,
    "jpeg",
    "A person planning in a notebook beside a laptop at a glass desk",
    [6000, 4000],
    "https://www.pexels.com/photo/person-writing-on-notebook-while-using-a-laptop-5387268/",
    "Karola G",
  ),
  ecommerce: photo(
    29502358,
    "jpeg",
    "A laptop and a smartphone showing an online shop and mobile payment",
    [6425, 4283],
    "https://www.pexels.com/photo/online-shopping-with-mobile-payment-technology-29502358/",
    "Julio Lopez",
  ),
  customSoftware: photo(
    12899191,
    "jpeg",
    "Two developers working through code together on a laptop",
    [4000, 6000],
    "https://www.pexels.com/photo/discussion-about-software-development-in-office-12899191/",
    "Mizuno K",
  ),
  aiAutomation: photo(
    8386437,
    "jpeg",
    "A robotic hand reaching towards a glowing digital network",
    [2919, 4379],
    "https://www.pexels.com/photo/robot-s-hand-on-a-blue-background-8386437/",
    "Tara Winstead",
  ),
  aiAgents: photo(
    5999878,
    "jpeg",
    "A woman messaging on her smartphone in the city",
    [4644, 3096],
    "https://www.pexels.com/photo/focused-woman-messaging-on-smartphone-5999878/",
    "Ono Kosuki",
  ),
  generativeAi: photo(
    17483873,
    "png",
    "An abstract 3D illustration of a neural network in blue and cyan",
    [7680, 4320],
    "https://www.pexels.com/photo/an-artist-s-illustration-of-artificial-intelligence-ai-this-image-was-inspired-neural-networks-used-in-deep-learning-it-was-created-by-novoto-studio-as-part-of-the-visualising-ai-proje-17483873/",
    "Google DeepMind",
  ),
} as const satisfies Record<string, ImageAsset>;
