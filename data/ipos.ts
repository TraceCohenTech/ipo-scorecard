// Major technology IPOs, 2021 – mid 2026
// Compiled from public market data (offer prices, first-day closes, IPO dates
// are generally well-documented; revenue figures are approximate — most
// recent full-year or trailing-twelve-month figures where available).
// Sorted by ipoDate, newest first.

export type IPOData = {
  name: string;
  ticker: string;
  sector: string;
  ipoDate: string;
  offerPrice: number;
  firstDayClose: number;
  revenueAtIPO: number;
  latestRevenue: number;
  profitable: boolean;
};

export const ipos: IPOData[] = [
  // ---------------------------------------------------------------------
  // 2025
  // ---------------------------------------------------------------------
  { name: "StubHub Holdings", ticker: "STUB", sector: "E-Commerce", ipoDate: "2025-09-17", offerPrice: 23.5, firstDayClose: 20.02, revenueAtIPO: 1770, latestRevenue: 1770, profitable: false },
  { name: "Netskope", ticker: "NTSK", sector: "Cybersecurity", ipoDate: "2025-09-18", offerPrice: 19, firstDayClose: 23.75, revenueAtIPO: 328, latestRevenue: 400, profitable: false },
  { name: "Gemini Space Station", ticker: "GEMI", sector: "Fintech", ipoDate: "2025-09-12", offerPrice: 17, firstDayClose: 19.5, revenueAtIPO: 142, latestRevenue: 150, profitable: false },
  { name: "Bullish", ticker: "BLSH", sector: "Fintech", ipoDate: "2025-08-13", offerPrice: 37, firstDayClose: 68, revenueAtIPO: 228, latestRevenue: 250, profitable: false },
  { name: "Figma", ticker: "FIG", sector: "SaaS", ipoDate: "2025-07-31", offerPrice: 33, firstDayClose: 115.5, revenueAtIPO: 749, latestRevenue: 821, profitable: false },
  { name: "Chime Financial", ticker: "CHYM", sector: "Fintech", ipoDate: "2025-06-12", offerPrice: 27, firstDayClose: 37.11, revenueAtIPO: 1670, latestRevenue: 1700, profitable: false },
  { name: "Circle Internet Group", ticker: "CRCL", sector: "Fintech", ipoDate: "2025-06-05", offerPrice: 31, firstDayClose: 83.23, revenueAtIPO: 1676, latestRevenue: 1700, profitable: true },
  { name: "eToro Group", ticker: "ETOR", sector: "Fintech", ipoDate: "2025-05-14", offerPrice: 52, firstDayClose: 67.19, revenueAtIPO: 931, latestRevenue: 1000, profitable: true },
  { name: "CoreWeave", ticker: "CRWV", sector: "AI/ML", ipoDate: "2025-03-28", offerPrice: 40, firstDayClose: 40, revenueAtIPO: 1920, latestRevenue: 3700, profitable: false },

  // ---------------------------------------------------------------------
  // 2024
  // ---------------------------------------------------------------------
  { name: "OneStream", ticker: "OS", sector: "SaaS", ipoDate: "2024-07-24", offerPrice: 20, firstDayClose: 27.1, revenueAtIPO: 451, latestRevenue: 571, profitable: false },
  { name: "Tempus AI", ticker: "TEM", sector: "AI/ML", ipoDate: "2024-06-14", offerPrice: 37, firstDayClose: 40.5, revenueAtIPO: 531, latestRevenue: 693, profitable: false },
  { name: "Waystar Holding", ticker: "WAY", sector: "Health Tech", ipoDate: "2024-06-06", offerPrice: 21.5, firstDayClose: 23.75, revenueAtIPO: 746, latestRevenue: 873, profitable: false },
  { name: "Rubrik", ticker: "RBRK", sector: "Cybersecurity", ipoDate: "2024-04-25", offerPrice: 32, firstDayClose: 37.24, revenueAtIPO: 627, latestRevenue: 886, profitable: false },
  { name: "Ibotta", ticker: "IBTA", sector: "Ad Tech", ipoDate: "2024-04-18", offerPrice: 88, firstDayClose: 95.28, revenueAtIPO: 320, latestRevenue: 342, profitable: true },
  { name: "Reddit", ticker: "RDDT", sector: "Ad Tech", ipoDate: "2024-03-21", offerPrice: 34, firstDayClose: 50.44, revenueAtIPO: 804, latestRevenue: 1300, profitable: false },
  { name: "Astera Labs", ticker: "ALAB", sector: "Semiconductors", ipoDate: "2024-03-20", offerPrice: 36, firstDayClose: 56.9, revenueAtIPO: 116, latestRevenue: 396, profitable: false },

  // ---------------------------------------------------------------------
  // 2023
  // ---------------------------------------------------------------------
  { name: "Birkenstock Holding", ticker: "BIRK", sector: "Consumer Tech", ipoDate: "2023-10-11", offerPrice: 46, firstDayClose: 40.2, revenueAtIPO: 1570, latestRevenue: 1870, profitable: true },
  { name: "Klaviyo", ticker: "KVYO", sector: "SaaS", ipoDate: "2023-09-20", offerPrice: 30, firstDayClose: 32.76, revenueAtIPO: 472, latestRevenue: 934, profitable: true },
  { name: "Instacart (Maplebear)", ticker: "CART", sector: "Logistics/Delivery", ipoDate: "2023-09-19", offerPrice: 30, firstDayClose: 33.7, revenueAtIPO: 2550, latestRevenue: 3380, profitable: true },
  { name: "Arm Holdings", ticker: "ARM", sector: "Semiconductors", ipoDate: "2023-09-14", offerPrice: 51, firstDayClose: 63.59, revenueAtIPO: 2680, latestRevenue: 3980, profitable: true },
  { name: "Cava Group", ticker: "CAVA", sector: "Consumer Tech", ipoDate: "2023-06-15", offerPrice: 22, firstDayClose: 43.78, revenueAtIPO: 583, latestRevenue: 943, profitable: false },

  // ---------------------------------------------------------------------
  // 2022
  // ---------------------------------------------------------------------
  { name: "Mobileye Global", ticker: "MBLY", sector: "Semiconductors", ipoDate: "2022-10-26", offerPrice: 21, firstDayClose: 26.19, revenueAtIPO: 1386, latestRevenue: 1650, profitable: true },
  { name: "Paycor HCM", ticker: "PYCR", sector: "SaaS", ipoDate: "2022-07-22", offerPrice: 22, firstDayClose: 19.66, revenueAtIPO: 375, latestRevenue: 614, profitable: false },

  // ---------------------------------------------------------------------
  // 2021
  // ---------------------------------------------------------------------
  { name: "Samsara", ticker: "IOT", sector: "Cloud Infrastructure", ipoDate: "2021-12-16", offerPrice: 23, firstDayClose: 30.25, revenueAtIPO: 303, latestRevenue: 1200, profitable: false },
  { name: "HashiCorp", ticker: "HCP", sector: "Cloud Infrastructure", ipoDate: "2021-12-08", offerPrice: 80, firstDayClose: 73.44, revenueAtIPO: 304, latestRevenue: 654, profitable: false },
  { name: "Sweetgreen", ticker: "SG", sector: "Consumer Tech", ipoDate: "2021-11-18", offerPrice: 28, firstDayClose: 37.51, revenueAtIPO: 220, latestRevenue: 676, profitable: false },
  { name: "Braze", ticker: "BRZE", sector: "SaaS", ipoDate: "2021-11-17", offerPrice: 65, firstDayClose: 85.63, revenueAtIPO: 150, latestRevenue: 563, profitable: false },
  { name: "Iris Energy", ticker: "IREN", sector: "Cloud Infrastructure", ipoDate: "2021-11-17", offerPrice: 28, firstDayClose: 21.06, revenueAtIPO: 1, latestRevenue: 500, profitable: false },
  { name: "LegalZoom.com", ticker: "LZ", sector: "SaaS", ipoDate: "2021-11-12", offerPrice: 26, firstDayClose: 29.54, revenueAtIPO: 470, latestRevenue: 704, profitable: true },
  { name: "Expensify", ticker: "EXFY", sector: "Fintech", ipoDate: "2021-11-11", offerPrice: 27, firstDayClose: 29.31, revenueAtIPO: 140, latestRevenue: 146, profitable: false },
  { name: "Lulu's Fashion Lounge", ticker: "LVLU", sector: "E-Commerce", ipoDate: "2021-11-10", offerPrice: 8.5, firstDayClose: 6.3, revenueAtIPO: 328, latestRevenue: 318, profitable: false },
  { name: "Udemy", ticker: "UDMY", sector: "SaaS", ipoDate: "2021-10-29", offerPrice: 29, firstDayClose: 19.05, revenueAtIPO: 429, latestRevenue: 779, profitable: false },
  { name: "GlobalFoundries", ticker: "GFS", sector: "Semiconductors", ipoDate: "2021-10-28", offerPrice: 47, firstDayClose: 46.53, revenueAtIPO: 6585, latestRevenue: 7400, profitable: true },
  { name: "Informatica", ticker: "INFA", sector: "SaaS", ipoDate: "2021-10-28", offerPrice: 29, firstDayClose: 29, revenueAtIPO: 1427, latestRevenue: 1660, profitable: false },
  { name: "GitLab", ticker: "GTLB", sector: "SaaS", ipoDate: "2021-10-14", offerPrice: 77, firstDayClose: 92.96, revenueAtIPO: 152, latestRevenue: 759, profitable: false },
  { name: "AvidXchange Holdings", ticker: "AVDX", sector: "Fintech", ipoDate: "2021-10-13", offerPrice: 22, firstDayClose: 26.72, revenueAtIPO: 236, latestRevenue: 443, profitable: false },
  { name: "Warby Parker", ticker: "WRBY", sector: "Consumer Tech", ipoDate: "2021-09-29", offerPrice: 40, firstDayClose: 47.31, revenueAtIPO: 394, latestRevenue: 770, profitable: false },
  { name: "Amplitude", ticker: "AMPL", sector: "SaaS", ipoDate: "2021-09-27", offerPrice: 50, firstDayClose: 43.75, revenueAtIPO: 150, latestRevenue: 310, profitable: false },
  { name: "Remitly Global", ticker: "RELY", sector: "Fintech", ipoDate: "2021-09-24", offerPrice: 43, firstDayClose: 49.3, revenueAtIPO: 257, latestRevenue: 1301, profitable: true },
  { name: "Toast", ticker: "TOST", sector: "Fintech", ipoDate: "2021-09-22", offerPrice: 40, firstDayClose: 69.19, revenueAtIPO: 823, latestRevenue: 4960, profitable: true },
  { name: "ForgeRock", ticker: "FORU", sector: "Cybersecurity", ipoDate: "2021-09-16", offerPrice: 25, firstDayClose: 32.58, revenueAtIPO: 146, latestRevenue: 205, profitable: false },
  { name: "On Holding", ticker: "ONON", sector: "Consumer Tech", ipoDate: "2021-09-15", offerPrice: 24, firstDayClose: 35.95, revenueAtIPO: 466, latestRevenue: 2318, profitable: true },
  { name: "Dutch Bros", ticker: "BROS", sector: "Consumer Tech", ipoDate: "2021-09-15", offerPrice: 23, firstDayClose: 36.06, revenueAtIPO: 327, latestRevenue: 1282, profitable: true },
  { name: "SentinelOne", ticker: "S", sector: "Cybersecurity", ipoDate: "2021-06-30", offerPrice: 35, firstDayClose: 46.5, revenueAtIPO: 93, latestRevenue: 740, profitable: false },
  { name: "Integral Ad Science", ticker: "IAS", sector: "Ad Tech", ipoDate: "2021-06-30", offerPrice: 18, firstDayClose: 16.85, revenueAtIPO: 223, latestRevenue: 530, profitable: true },
  { name: "Payoneer Global", ticker: "PAYO", sector: "Fintech", ipoDate: "2021-06-25", offerPrice: 10, firstDayClose: 11.66, revenueAtIPO: 358, latestRevenue: 977, profitable: true },
  { name: "Doximity", ticker: "DOCS", sector: "Health Tech", ipoDate: "2021-06-24", offerPrice: 26, firstDayClose: 33.05, revenueAtIPO: 207, latestRevenue: 570, profitable: true },
  { name: "Confluent", ticker: "CFLT", sector: "Cloud Infrastructure", ipoDate: "2021-06-24", offerPrice: 36, firstDayClose: 45.03, revenueAtIPO: 236, latestRevenue: 908, profitable: false },
  { name: "Sprinklr", ticker: "CXM", sector: "SaaS", ipoDate: "2021-06-23", offerPrice: 16, firstDayClose: 18, revenueAtIPO: 412, latestRevenue: 742, profitable: true },
  { name: "Kanzhun (BOSS Zhipin)", ticker: "BZ", sector: "SaaS", ipoDate: "2021-06-11", offerPrice: 19, firstDayClose: 28.16, revenueAtIPO: 293, latestRevenue: 1050, profitable: true },
  { name: "TaskUs", ticker: "TASK", sector: "SaaS", ipoDate: "2021-06-11", offerPrice: 23, firstDayClose: 32.1, revenueAtIPO: 657, latestRevenue: 1060, profitable: true },
  { name: "monday.com", ticker: "MNDY", sector: "SaaS", ipoDate: "2021-06-10", offerPrice: 155, firstDayClose: 180.66, revenueAtIPO: 161, latestRevenue: 972, profitable: true },
  { name: "Marqeta", ticker: "MQ", sector: "Fintech", ipoDate: "2021-06-09", offerPrice: 27, firstDayClose: 32.75, revenueAtIPO: 290, latestRevenue: 517, profitable: false },
  { name: "dLocal", ticker: "DLO", sector: "Fintech", ipoDate: "2021-06-03", offerPrice: 21, firstDayClose: 34.5, revenueAtIPO: 104, latestRevenue: 726, profitable: true },
  { name: "SoFi Technologies", ticker: "SOFI", sector: "Fintech", ipoDate: "2021-06-01", offerPrice: 10, firstDayClose: 18.03, revenueAtIPO: 621, latestRevenue: 2603, profitable: true },
  { name: "Duolingo", ticker: "DUOL", sector: "Consumer Tech", ipoDate: "2021-07-28", offerPrice: 102, firstDayClose: 121.55, revenueAtIPO: 250, latestRevenue: 748, profitable: true },
  { name: "Robinhood Markets", ticker: "HOOD", sector: "Fintech", ipoDate: "2021-07-29", offerPrice: 38, firstDayClose: 34.82, revenueAtIPO: 959, latestRevenue: 2950, profitable: true },
  { name: "Couchbase", ticker: "BASE", sector: "Cloud Infrastructure", ipoDate: "2021-07-22", offerPrice: 24, firstDayClose: 31.24, revenueAtIPO: 126, latestRevenue: 209, profitable: false },
  { name: "Blend Labs", ticker: "BLND", sector: "Fintech", ipoDate: "2021-07-16", offerPrice: 18, firstDayClose: 19.34, revenueAtIPO: 96, latestRevenue: 155, profitable: false },
  { name: "ZipRecruiter", ticker: "ZIP", sector: "SaaS", ipoDate: "2021-05-26", offerPrice: 18, firstDayClose: 19.1, revenueAtIPO: 482, latestRevenue: 870, profitable: true },
  { name: "Procore Technologies", ticker: "PCOR", sector: "SaaS", ipoDate: "2021-05-20", offerPrice: 63, firstDayClose: 69.87, revenueAtIPO: 400, latestRevenue: 1150, profitable: false },
  { name: "Oatly Group", ticker: "OTLY", sector: "Consumer Tech", ipoDate: "2021-05-20", offerPrice: 17, firstDayClose: 20.2, revenueAtIPO: 421, latestRevenue: 800, profitable: false },
  { name: "Squarespace", ticker: "SQSP", sector: "SaaS", ipoDate: "2021-05-19", offerPrice: 50, firstDayClose: 44.66, revenueAtIPO: 621, latestRevenue: 1050, profitable: true },
  { name: "UiPath", ticker: "PATH", sector: "SaaS", ipoDate: "2021-04-21", offerPrice: 56, firstDayClose: 69, revenueAtIPO: 608, latestRevenue: 1430, profitable: false },
  { name: "AppLovin", ticker: "APP", sector: "Ad Tech", ipoDate: "2021-04-15", offerPrice: 80, firstDayClose: 80.55, revenueAtIPO: 1445, latestRevenue: 4710, profitable: true },
  { name: "Coinbase Global", ticker: "COIN", sector: "Fintech", ipoDate: "2021-04-14", offerPrice: 250, firstDayClose: 328.28, revenueAtIPO: 1140, latestRevenue: 6560, profitable: true },
  { name: "Compass", ticker: "COMP", sector: "SaaS", ipoDate: "2021-04-01", offerPrice: 18, firstDayClose: 20.15, revenueAtIPO: 3700, latestRevenue: 5600, profitable: false },
  { name: "Coursera", ticker: "COUR", sector: "SaaS", ipoDate: "2021-03-31", offerPrice: 33, firstDayClose: 45, revenueAtIPO: 293, latestRevenue: 695, profitable: false },
  { name: "DigitalOcean Holdings", ticker: "DOCN", sector: "Cloud Infrastructure", ipoDate: "2021-03-24", offerPrice: 47, firstDayClose: 46.9, revenueAtIPO: 318, latestRevenue: 781, profitable: true },
  { name: "Olo", ticker: "OLO", sector: "SaaS", ipoDate: "2021-03-17", offerPrice: 17, firstDayClose: 27.15, revenueAtIPO: 98, latestRevenue: 220, profitable: true },
  { name: "Roblox Corporation", ticker: "RBLX", sector: "Gaming", ipoDate: "2021-03-10", offerPrice: 45, firstDayClose: 69.5, revenueAtIPO: 924, latestRevenue: 3800, profitable: false },
  { name: "Bumble", ticker: "BMBL", sector: "Consumer Tech", ipoDate: "2021-02-11", offerPrice: 43, firstDayClose: 70.31, revenueAtIPO: 580, latestRevenue: 1050, profitable: false },
  { name: "Hims & Hers Health", ticker: "HIMS", sector: "Health Tech", ipoDate: "2021-01-20", offerPrice: 10, firstDayClose: 11.6, revenueAtIPO: 149, latestRevenue: 1870, profitable: true },
  { name: "Playtika Holding", ticker: "PLTK", sector: "Gaming", ipoDate: "2021-01-15", offerPrice: 27, firstDayClose: 26.65, revenueAtIPO: 1940, latestRevenue: 2660, profitable: true },
  { name: "Poshmark", ticker: "POSH", sector: "E-Commerce", ipoDate: "2021-01-14", offerPrice: 42, firstDayClose: 101.5, revenueAtIPO: 326, latestRevenue: 330, profitable: false },
  { name: "Affirm Holdings", ticker: "AFRM", sector: "Fintech", ipoDate: "2021-01-13", offerPrice: 49, firstDayClose: 97.24, revenueAtIPO: 509, latestRevenue: 2320, profitable: false },
  { name: "LifeMD", ticker: "LFMD", sector: "Health Tech", ipoDate: "2021-01-06", offerPrice: 14, firstDayClose: 14.5, revenueAtIPO: 43, latestRevenue: 185, profitable: true },
];
