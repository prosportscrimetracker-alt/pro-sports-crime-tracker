import { useState, useRef, useEffect } from "react";

var CRIME_DATABASE = {
  "Aaron Hernandez": { sport: "NFL", team: "New England Patriots", position: "TE", added: "2026-01-15", crimes: [{ year: 2013, charge: "First-degree murder (Odin Lloyd)", outcome: "Convicted, sentenced to life without parole" }, { year: 2014, charge: "Double murder charges (Daniel de Abreu & Safiro Furtado)", outcome: "Acquitted" }], status: "Deceased (2017)" },
  "Michael Vick": { sport: "NFL", team: "Atlanta Falcons", position: "QB", added: "2026-01-15", crimes: [{ year: 2007, charge: "Conspiracy to operate an illegal dogfighting ring", outcome: "Guilty plea, 21 months federal prison" }], status: "Released, returned to NFL" },
  "Ray Rice": { sport: "NFL", team: "Baltimore Ravens", position: "RB", added: "2026-01-15", crimes: [{ year: 2014, charge: "Aggravated assault (domestic violence)", outcome: "Pretrial intervention program, charges dismissed" }], status: "Released by Ravens, indefinitely suspended" },
  "O.J. Simpson": { sport: "NFL", team: "Buffalo Bills", position: "RB", added: "2026-01-15", crimes: [{ year: 1995, charge: "Double murder (Nicole Brown Simpson & Ron Goldman)", outcome: "Acquitted (found liable in civil trial)" }, { year: 2007, charge: "Armed robbery & kidnapping", outcome: "Convicted, sentenced to 33 years (paroled 2017)" }], status: "Deceased (2024)" },
  "Rae Carruth": { sport: "NFL", team: "Carolina Panthers", position: "WR", added: "2026-01-15", crimes: [{ year: 1999, charge: "Conspiracy to commit murder (Cherica Adams)", outcome: "Convicted, sentenced to 18-24 years" }], status: "Released from prison (2018)" },
  "Plaxico Burress": { sport: "NFL", team: "New York Giants", position: "WR", added: "2026-01-15", crimes: [{ year: 2008, charge: "Criminal possession of a weapon (accidental self-shooting)", outcome: "Guilty plea, 2 years prison" }], status: "Served sentence, returned to NFL" },
  "Darren Sharper": { sport: "NFL", team: "Multiple teams", position: "S", added: "2026-01-15", crimes: [{ year: 2014, charge: "Multiple counts of rape across several states", outcome: "Convicted, sentenced to 18 years federal prison" }], status: "Incarcerated" },
  "Adam 'Pacman' Jones": { sport: "NFL", team: "Tennessee Titans / Bengals", position: "CB", added: "2026-01-15", crimes: [{ year: 2007, charge: "Involvement in strip club shooting (Las Vegas)", outcome: "No criminal charges filed, NFL suspension" }, { year: 2013, charge: "Assault", outcome: "Misdemeanor charges" }], status: "Multiple arrests throughout career" },
  "Donte Stallworth": { sport: "NFL", team: "Cleveland Browns", position: "WR", added: "2026-01-15", crimes: [{ year: 2009, charge: "DUI manslaughter (Mario Reyes)", outcome: "Guilty plea, 30 days jail + 2 years house arrest" }], status: "Returned to NFL after suspension" },
  "Henry Ruggs III": { sport: "NFL", team: "Las Vegas Raiders", position: "WR", added: "2026-02-01", crimes: [{ year: 2021, charge: "DUI resulting in death (Tina Tintor)", outcome: "Guilty plea, sentenced to 3-10 years prison" }], status: "Released by Raiders, incarcerated" },
  "Tyreek Hill": { sport: "NFL", team: "Kansas City Chiefs / Miami Dolphins", position: "WR", added: "2026-02-01", crimes: [{ year: 2015, charge: "Domestic assault & battery of pregnant girlfriend", outcome: "Guilty plea, 3 years probation, anger management" }], status: "Active in NFL" },
  "Deshaun Watson": { sport: "NFL", team: "Houston Texans / Cleveland Browns", position: "QB", added: "2026-02-01", crimes: [{ year: 2021, charge: "Multiple civil lawsuits alleging sexual misconduct (24+ women)", outcome: "Two grand juries declined criminal charges; civil settlements" }], status: "11-game NFL suspension, $5M fine" },
  "Greg Hardy": { sport: "NFL", team: "Carolina Panthers / Dallas Cowboys", position: "DE", added: "2026-01-15", crimes: [{ year: 2014, charge: "Assault on a female & communicating threats", outcome: "Initially convicted, charges dismissed on appeal (victim did not appear)" }], status: "Left NFL" },
  "Sebastian Janikowski": { sport: "NFL", team: "Oakland Raiders", position: "K", added: "2026-01-15", crimes: [{ year: 2000, charge: "Attempted bribery of a police officer & GHB possession", outcome: "GHB charge dropped, acquitted of bribery" }], status: "Retired" },
  "Leonard Little": { sport: "NFL", team: "St. Louis Rams", position: "DE", added: "2026-02-10", crimes: [{ year: 1998, charge: "Involuntary manslaughter (DUI death of Susan Gutweiler)", outcome: "Guilty plea, 90 days jail, 1000 hours community service" }, { year: 2004, charge: "Second DUI arrest", outcome: "Acquitted" }], status: "Retired" },
  "Jovan Belcher": { sport: "NFL", team: "Kansas City Chiefs", position: "LB", added: "2026-02-10", crimes: [{ year: 2012, charge: "Murder-suicide (killed Kasandra Perkins, then himself)", outcome: "Deceased before charges could be filed" }], status: "Deceased (2012)" },
  "Jim Brown": { sport: "NFL", team: "Cleveland Browns", position: "RB", added: "2026-02-10", crimes: [{ year: 1965, charge: "Assault (paternity suit complainant thrown from balcony allegation)", outcome: "Acquitted" }, { year: 1999, charge: "Vandalism (smashing wife's car)", outcome: "Convicted, 6 months jail (refused probation terms)" }], status: "Deceased (2023)" },
  "Mark Chmura": { sport: "NFL", team: "Green Bay Packers", position: "TE", added: "2026-02-10", crimes: [{ year: 2000, charge: "Sexual assault of minor (babysitter at post-prom party)", outcome: "Acquitted" }], status: "Career ended" },
  "Daryl Washington": { sport: "NFL", team: "Arizona Cardinals", position: "LB", added: "2026-02-10", crimes: [{ year: 2013, charge: "Aggravated assault (domestic violence against girlfriend)", outcome: "Guilty plea, suspended indefinitely by NFL" }], status: "Left NFL" },
  "Richie Incognito": { sport: "NFL", team: "Miami Dolphins / Bills / Raiders", position: "OG", added: "2026-02-15", crimes: [{ year: 2018, charge: "Threats & disorderly conduct at a funeral home", outcome: "Involuntary psychiatric hold, charges dropped" }, { year: 2020, charge: "Disorderly conduct", outcome: "Charges resolved" }], status: "Retired" },
  "Antonio Brown": { sport: "NFL", team: "Pittsburgh Steelers / Buccaneers", position: "WR", added: "2026-02-15", crimes: [{ year: 2020, charge: "Burglary, battery & criminal mischief (moving truck driver altercation)", outcome: "Plea deal, 2 years probation, community service" }], status: "Left NFL" },
  "Kareem Hunt": { sport: "NFL", team: "Kansas City Chiefs / Cleveland Browns", position: "RB", added: "2026-02-15", crimes: [{ year: 2018, charge: "Assault (hotel incident caught on video)", outcome: "No criminal charges filed; 8-game NFL suspension" }], status: "Active in NFL" },
  "Ray Lewis": { sport: "NFL", team: "Baltimore Ravens", position: "LB", added: "2026-02-15", crimes: [{ year: 2000, charge: "Murder charges (double stabbing at Super Bowl party)", outcome: "Murder charges dropped; guilty plea to obstruction of justice" }], status: "Retired, Hall of Famer" },
  "Travis Henry": { sport: "NFL", team: "Buffalo Bills / Broncos", position: "RB", added: "2026-02-15", crimes: [{ year: 2008, charge: "Conspiracy to distribute cocaine", outcome: "Convicted, 3 years federal prison" }], status: "Served sentence" },
  "Marshawn Lynch": { sport: "NFL", team: "Seattle Seahawks / Raiders", position: "RB", added: "2026-02-20", crimes: [{ year: 2012, charge: "DUI", outcome: "Guilty plea, reduced charges" }, { year: 2019, charge: "DUI (Las Vegas)", outcome: "Charges pending, resolved" }], status: "Retired" },
  "Aldon Smith": { sport: "NFL", team: "San Francisco 49ers / Raiders", position: "LB", added: "2026-02-20", crimes: [{ year: 2013, charge: "DUI & marijuana possession", outcome: "Guilty plea" }, { year: 2014, charge: "Bomb threat at LAX airport", outcome: "Guilty plea" }, { year: 2018, charge: "DUI (second offense)", outcome: "Charges filed" }], status: "Multiple suspensions, left NFL" },
  "Justin Blackmon": { sport: "NFL", team: "Jacksonville Jaguars", position: "WR", added: "2026-02-20", crimes: [{ year: 2012, charge: "DUI arrest", outcome: "Guilty plea" }, { year: 2013, charge: "Marijuana possession & second DUI", outcome: "Indefinite NFL suspension" }], status: "Indefinitely suspended, never returned" },
  "Josh Gordon": { sport: "NFL", team: "Cleveland Browns / Multiple", position: "WR", added: "2026-02-20", crimes: [{ year: 2016, charge: "DUI arrest", outcome: "Charges resolved" }, { year: 2020, charge: "Multiple substance abuse policy violations", outcome: "Repeated NFL suspensions" }], status: "Multiple reinstatements and suspensions" },
  "Kobe Bryant": { sport: "NBA", team: "Los Angeles Lakers", position: "SG", added: "2026-01-15", crimes: [{ year: 2003, charge: "Sexual assault allegation (Eagle, Colorado)", outcome: "Criminal case dropped after accuser refused to testify; civil settlement" }], status: "Deceased (2020)" },
  "Allen Iverson": { sport: "NBA", team: "Philadelphia 76ers", position: "PG", added: "2026-01-15", crimes: [{ year: 1993, charge: "Maiming by mob (bowling alley brawl)", outcome: "Convicted, later granted clemency by governor" }, { year: 2002, charge: "Threats, carrying a firearm", outcome: "Charges dropped or reduced" }], status: "Retired" },
  "Jayson Williams": { sport: "NBA", team: "New Jersey Nets", position: "C", added: "2026-01-15", crimes: [{ year: 2002, charge: "Manslaughter (Costas Christofi, limousine driver)", outcome: "Guilty plea to aggravated assault, 18 months prison" }], status: "Served sentence" },
  "Gilbert Arenas": { sport: "NBA", team: "Washington Wizards", position: "PG", added: "2026-01-15", crimes: [{ year: 2009, charge: "Carrying a pistol without a license (guns in locker room)", outcome: "Guilty plea, 30 days halfway house, 2 years probation" }], status: "Suspended by NBA, career declined" },
  "Ron Artest (Metta World Peace)": { sport: "NBA", team: "Indiana Pacers", position: "SF", added: "2026-01-15", crimes: [{ year: 2004, charge: "Assault (Malice at the Palace brawl)", outcome: "Season-long suspension, misdemeanor assault charge" }, { year: 2007, charge: "Domestic violence", outcome: "Guilty plea, 20 days community service" }], status: "Retired" },
  "Dennis Rodman": { sport: "NBA", team: "Chicago Bulls / Detroit Pistons", position: "PF", added: "2026-01-15", crimes: [{ year: 1999, charge: "DUI & multiple domestic disturbance incidents", outcome: "Various fines, probation, community service" }], status: "Retired, multiple legal issues" },
  "Javaris Crittenton": { sport: "NBA", team: "Washington Wizards / Multiple", position: "PG", added: "2026-02-20", crimes: [{ year: 2011, charge: "Murder (Jullian Jones, bystander in drive-by shooting)", outcome: "Convicted, sentenced to 23 years prison" }], status: "Incarcerated" },
  "Jason Kidd": { sport: "NBA", team: "Phoenix Suns / Nets / Mavericks", position: "PG", added: "2026-02-20", crimes: [{ year: 2001, charge: "Domestic violence (spousal abuse)", outcome: "Guilty plea to misdemeanor, 6 months counseling" }], status: "Active NBA head coach" },
  "Charles Barkley": { sport: "NBA", team: "Phoenix Suns / Philadelphia 76ers", position: "PF", added: "2026-02-25", crimes: [{ year: 1997, charge: "Battery (threw man through bar window)", outcome: "Charges resolved, fined" }, { year: 2008, charge: "DUI", outcome: "Guilty plea, jail time, community service" }], status: "Retired, TV analyst" },
  "Sebastian Telfair": { sport: "NBA", team: "Multiple teams", position: "PG", added: "2026-02-25", crimes: [{ year: 2017, charge: "Illegal weapons possession (3 guns, body armor in car)", outcome: "Convicted, sentenced to 3.5 years prison" }], status: "Incarcerated" },
  "Lamar Odom": { sport: "NBA", team: "Los Angeles Lakers / Clippers", position: "PF", added: "2026-02-25", crimes: [{ year: 2013, charge: "DUI arrest", outcome: "Guilty plea, no contest" }], status: "Retired" },
  "Zach Randolph": { sport: "NBA", team: "Memphis Grizzlies / Multiple", position: "PF", added: "2026-02-25", crimes: [{ year: 2017, charge: "Marijuana possession with intent to sell", outcome: "Charges reduced to misdemeanor" }], status: "Retired" },
  "Jalen Rose": { sport: "NBA", team: "Indiana Pacers / Multiple", position: "SG", added: "2026-03-01", crimes: [{ year: 2011, charge: "DUI", outcome: "Guilty plea, 20 days jail" }], status: "Retired, TV analyst" },
  "Lance Stephenson": { sport: "NBA", team: "Indiana Pacers / Multiple", position: "SG", added: "2026-03-01", crimes: [{ year: 2010, charge: "Domestic battery (pushing girlfriend down stairs)", outcome: "Charges dropped" }], status: "Played overseas" },
  "Ty Lawson": { sport: "NBA", team: "Denver Nuggets / Multiple", position: "PG", added: "2026-03-01", crimes: [{ year: 2015, charge: "Multiple DUI arrests (2 in same year)", outcome: "Guilty plea, jail time, probation" }], status: "Left NBA" },
  "Miles Bridges": { sport: "NBA", team: "Charlotte Hornets", position: "SF", added: "2026-03-05", crimes: [{ year: 2022, charge: "Felony domestic violence (assault in front of children)", outcome: "Guilty plea to misdemeanor, 3 years probation" }], status: "Returned to NBA after suspension" },
  "Jaxson Hayes": { sport: "NBA", team: "New Orleans Pelicans", position: "C", added: "2026-03-05", crimes: [{ year: 2021, charge: "Domestic violence & resisting arrest (LAPD body cam footage)", outcome: "Guilty plea to misdemeanor, probation" }], status: "Active in NBA" },
  "Pete Rose": { sport: "MLB", team: "Cincinnati Reds", position: "Manager/Player", added: "2026-01-15", crimes: [{ year: 1990, charge: "Tax evasion (failure to report gambling income)", outcome: "Guilty plea, 5 months prison" }], status: "Deceased (2024), permanently banned from MLB" },
  "Darryl Strawberry": { sport: "MLB", team: "New York Mets / Yankees", position: "OF", added: "2026-01-15", crimes: [{ year: 1999, charge: "Drug possession (cocaine), solicitation of prostitution", outcome: "Multiple arrests, probation violations, prison time" }], status: "Retired, recovered" },
  "Dwight Gooden": { sport: "MLB", team: "New York Mets", position: "P", added: "2026-01-15", crimes: [{ year: 1994, charge: "Multiple drug-related charges (cocaine)", outcome: "Suspensions, probation, brief jail time" }], status: "Retired" },
  "Denny McLain": { sport: "MLB", team: "Detroit Tigers", position: "P", added: "2026-01-15", crimes: [{ year: 1985, charge: "Racketeering, extortion, cocaine possession", outcome: "Convicted, 23 years sentence (reduced on appeal)" }, { year: 1996, charge: "Theft, mail fraud, money laundering", outcome: "Convicted, 8 years prison" }], status: "Served multiple sentences" },
  "Milton Bradley": { sport: "MLB", team: "Multiple teams", position: "OF", added: "2026-01-15", crimes: [{ year: 2011, charge: "Spousal abuse / domestic violence", outcome: "Convicted, 32 months prison" }], status: "Left MLB" },
  "Miguel Cabrera": { sport: "MLB", team: "Detroit Tigers", position: "1B/DH", added: "2026-02-20", crimes: [{ year: 2009, charge: "DUI arrest", outcome: "Charges resolved, entered alcohol treatment" }, { year: 2011, charge: "Domestic dispute", outcome: "No charges filed" }], status: "Retired" },
  "Yasiel Puig": { sport: "MLB", team: "Los Angeles Dodgers / Multiple", position: "OF", added: "2026-02-20", crimes: [{ year: 2022, charge: "Lying to federal agents regarding illegal gambling operation", outcome: "Guilty plea to federal charge" }], status: "Left MLB" },
  "Felipe Vazquez": { sport: "MLB", team: "Pittsburgh Pirates", position: "P", added: "2026-02-25", crimes: [{ year: 2019, charge: "Sexual assault of a minor & solicitation of a child", outcome: "Convicted, sentenced to 2-4 years prison" }], status: "Incarcerated, career over" },
  "Matt Bush": { sport: "MLB", team: "Texas Rangers", position: "P", added: "2026-02-25", crimes: [{ year: 2012, charge: "DUI causing serious bodily injury (hit motorcyclist, fled scene)", outcome: "Convicted, 51 months prison" }], status: "Returned to MLB after prison" },
  "Josh Hamilton": { sport: "MLB", team: "Texas Rangers / Angels", position: "OF", added: "2026-02-25", crimes: [{ year: 2015, charge: "Injury to a child (eldest daughter, struck during argument)", outcome: "No indictment by grand jury" }], status: "Retired" },
  "Marcell Ozuna": { sport: "MLB", team: "Atlanta Braves", position: "OF/DH", added: "2026-03-01", crimes: [{ year: 2021, charge: "Aggravated assault by strangulation (domestic violence)", outcome: "Charges dropped after victim recanted" }, { year: 2023, charge: "DUI arrest", outcome: "Charges resolved" }], status: "Active in MLB" },
  "Trevor Bauer": { sport: "MLB", team: "Los Angeles Dodgers", position: "P", added: "2026-03-01", crimes: [{ year: 2021, charge: "Sexual assault allegations (multiple women)", outcome: "No criminal charges filed; 2-year MLB suspension (longest in history for DV)" }], status: "Played in Japan/Mexico" },
  "Addison Russell": { sport: "MLB", team: "Chicago Cubs", position: "SS", added: "2026-03-01", crimes: [{ year: 2018, charge: "Domestic violence allegations (ex-wife)", outcome: "40-game MLB suspension" }], status: "Left MLB" },
  "Roberto Osuna": { sport: "MLB", team: "Houston Astros / Toronto Blue Jays", position: "P", added: "2026-03-05", crimes: [{ year: 2018, charge: "Assault (domestic violence against mother of his child)", outcome: "Peace bond agreement, 75-game MLB suspension" }], status: "Left MLB" },
  "Slava Voynov": { sport: "NHL", team: "Los Angeles Kings", position: "D", added: "2026-01-15", crimes: [{ year: 2014, charge: "Domestic violence (felony corporal injury)", outcome: "Guilty plea to misdemeanor, 90 days jail" }], status: "Contract terminated, deported to Russia" },
  "Mike Danton": { sport: "NHL", team: "St. Louis Blues", position: "C", added: "2026-01-15", crimes: [{ year: 2004, charge: "Conspiracy to commit murder (hiring hitman against agent)", outcome: "Guilty plea, 7.5 years prison" }], status: "Released, played in minor leagues" },
  "Craig MacTavish": { sport: "NHL", team: "Boston Bruins / Edmonton Oilers", position: "C", added: "2026-01-15", crimes: [{ year: 1984, charge: "Vehicular homicide (DUI death)", outcome: "Convicted, 1 year prison" }], status: "Returned to NHL as player and coach" },
  "Patrick Kane": { sport: "NHL", team: "Chicago Blackhawks", position: "RW", added: "2026-01-15", crimes: [{ year: 2009, charge: "Assault & robbery (altercation with cab driver)", outcome: "Charges reduced, non-criminal disposition" }], status: "Active in NHL" },
  "Semyon Varlamov": { sport: "NHL", team: "Colorado Avalanche", position: "G", added: "2026-02-25", crimes: [{ year: 2013, charge: "Domestic violence (assault & kidnapping of girlfriend)", outcome: "Charges dismissed" }], status: "Active in NHL" },
  "Evander Kane": { sport: "NHL", team: "San Jose Sharks / Edmonton Oilers", position: "LW", added: "2026-03-05", crimes: [{ year: 2016, charge: "Assault allegations (woman in hotel)", outcome: "No charges filed" }, { year: 2021, charge: "Domestic violence allegations (wife), gambling investigation", outcome: "No criminal charges; NHL investigation" }], status: "Active in NHL" },
  "Austin Watson": { sport: "NHL", team: "Nashville Predators", position: "LW", added: "2026-03-05", crimes: [{ year: 2018, charge: "Domestic assault (girlfriend at gas station)", outcome: "Guilty plea to misdemeanor, 27-game NHL suspension" }], status: "Left NHL" },
  "Tiger Woods": { sport: "Golf (PGA)", team: "N/A", position: "Golfer", added: "2026-01-15", crimes: [{ year: 2017, charge: "DUI (found asleep at wheel under influence of medications)", outcome: "Guilty plea to reckless driving, probation, community service" }], status: "Active on PGA Tour" },
  "Scottie Scheffler": { sport: "Golf (PGA)", team: "N/A", position: "Golfer", added: "2026-03-08", crimes: [{ year: 2024, charge: "Assault on a police officer & reckless driving (PGA Championship traffic incident)", outcome: "All charges dismissed" }], status: "Active on PGA Tour" },
  "Oscar Pistorius": { sport: "Track & Field", team: "South Africa", position: "Sprinter", added: "2026-01-15", crimes: [{ year: 2013, charge: "Murder (Reeva Steenkamp)", outcome: "Convicted of murder, sentenced to 13 years 5 months" }], status: "Paroled (2024)" },
  "Tonya Harding": { sport: "Figure Skating", team: "USA", position: "Singles skater", added: "2026-01-15", crimes: [{ year: 1994, charge: "Conspiracy to hinder prosecution (Nancy Kerrigan attack)", outcome: "Guilty plea, 3 years probation, $160K fine, community service" }], status: "Banned from US Figure Skating for life" },
  "Mike Tyson": { sport: "Boxing", team: "N/A", position: "Heavyweight", added: "2026-02-01", crimes: [{ year: 1992, charge: "Rape (Desiree Washington)", outcome: "Convicted, sentenced to 6 years prison (served 3)" }, { year: 1998, charge: "Assault (road rage incident)", outcome: "No contest plea, 1 year probation" }], status: "Retired, media personality" },
  "Floyd Mayweather Jr.": { sport: "Boxing", team: "N/A", position: "Welterweight", added: "2026-02-01", crimes: [{ year: 2002, charge: "Domestic battery (two counts)", outcome: "Guilty plea, 2 days jail, community service" }, { year: 2010, charge: "Domestic violence & harassment (Josie Harris)", outcome: "Guilty plea, 90 days jail (served 2 months)" }], status: "Retired" },
  "Conor McGregor": { sport: "MMA (UFC)", team: "N/A", position: "Featherweight/Lightweight", added: "2026-02-01", crimes: [{ year: 2018, charge: "Assault & criminal mischief (bus attack at Barclays Center)", outcome: "Plea deal, community service, anger management" }, { year: 2019, charge: "Assault (punching elderly man in pub)", outcome: "Guilty plea, fined" }], status: "Active in UFC" },
  "Jon Jones": { sport: "MMA (UFC)", team: "N/A", position: "Heavyweight", added: "2026-02-01", crimes: [{ year: 2012, charge: "DUI", outcome: "Guilty plea" }, { year: 2015, charge: "Hit-and-run (pregnant woman injured)", outcome: "Guilty plea, 18 months probation" }, { year: 2020, charge: "DUI & negligent use of a firearm", outcome: "Guilty plea, probation" }], status: "Active UFC champion" },
  "War Machine (Jon Koppenhaver)": { sport: "MMA (UFC)", team: "N/A", position: "Welterweight", added: "2026-02-10", crimes: [{ year: 2014, charge: "Attempted murder, kidnapping, sexual assault (Christy Mack)", outcome: "Convicted, sentenced to life with possibility of parole" }], status: "Incarcerated" },
  "Hope Solo": { sport: "Soccer (NWSL)", team: "US Women's National Team", position: "GK", added: "2026-03-08", crimes: [{ year: 2014, charge: "Domestic violence (assault on nephew and half-sister)", outcome: "Charges dropped" }, { year: 2022, charge: "DUI & child abuse (children in car)", outcome: "Guilty plea to DUI" }], status: "Retired" },
  "Lance Armstrong": { sport: "Cycling", team: "US Postal Service Team", position: "Cyclist", added: "2026-03-08", crimes: [{ year: 2012, charge: "Federal investigation for fraud, doping conspiracy", outcome: "Criminal charges not pursued; lifetime ban from competition, stripped of 7 Tour de France titles" }], status: "Banned for life" },
  "Marion Jones": { sport: "Track & Field", team: "USA", position: "Sprinter", added: "2026-03-08", crimes: [{ year: 2007, charge: "Lying to federal agents about steroid use & check fraud scheme", outcome: "Guilty plea, 6 months federal prison" }], status: "Stripped of Olympic medals" },
};

var ALL_NAMES = Object.keys(CRIME_DATABASE).sort();
var RECENTLY_ADDED = Object.keys(CRIME_DATABASE).sort(function(a,b){return CRIME_DATABASE[b].added.localeCompare(CRIME_DATABASE[a].added);}).slice(0,6);

var sportColors = {
  "NFL":{bg:"#1a3a1a",border:"#2d6b2d",text:"#4ade80",badge:"#166534"},"NBA":{bg:"#3a1a1a",border:"#6b2d2d",text:"#f87171",badge:"#7f1d1d"},"MLB":{bg:"#1a2a3a",border:"#2d4d6b",text:"#60a5fa",badge:"#1e3a5f"},"NHL":{bg:"#2a2a3a",border:"#4d4d6b",text:"#a78bfa",badge:"#3b3560"},"Golf (PGA)":{bg:"#3a3a1a",border:"#6b6b2d",text:"#facc15",badge:"#554400"},"Figure Skating":{bg:"#1a3a3a",border:"#2d6b6b",text:"#2dd4bf",badge:"#134e4a"},"Boxing":{bg:"#3a1a2a",border:"#6b2d4d",text:"#f472b6",badge:"#5c1035"},"MMA (UFC)":{bg:"#3a2a1a",border:"#6b4d2d",text:"#fb923c",badge:"#5c3310"},"Soccer (NWSL)":{bg:"#1a3a2a",border:"#2d6b4d",text:"#34d399",badge:"#064e3b"},"Cycling":{bg:"#2a3a1a",border:"#4d6b2d",text:"#a3e635",badge:"#365314"},"Track & Field":{bg:"#3a2a1a",border:"#6b4d2d",text:"#fb923c",badge:"#5c3310"},
};
var lightSportColors = {
  "NFL":{bg:"#eafbea",border:"#86d986",text:"#166534",badge:"#dcfce7"},"NBA":{bg:"#fbeaea",border:"#d98686",text:"#7f1d1d",badge:"#fce7e7"},"MLB":{bg:"#eaf0fb",border:"#86a6d9",text:"#1e3a5f",badge:"#dbeafe"},"NHL":{bg:"#eeeafb",border:"#a686d9",text:"#3b3560",badge:"#ede9fe"},"Golf (PGA)":{bg:"#fbfbea",border:"#d9d986",text:"#554400",badge:"#fef9c3"},"Figure Skating":{bg:"#eafbfb",border:"#86d9d9",text:"#134e4a",badge:"#ccfbf1"},"Boxing":{bg:"#fbeaef",border:"#d986a6",text:"#5c1035",badge:"#fce7f3"},"MMA (UFC)":{bg:"#fbf0ea",border:"#d9a686",text:"#5c3310",badge:"#ffedd5"},"Soccer (NWSL)":{bg:"#eafbf0",border:"#86d9a6",text:"#064e3b",badge:"#d1fae5"},"Cycling":{bg:"#f0fbea",border:"#a6d986",text:"#365314",badge:"#ecfccb"},"Track & Field":{bg:"#fbf0ea",border:"#d9a686",text:"#5c3310",badge:"#ffedd5"},
};

function getColor(sport,dark){if(dark)return sportColors[sport]||{bg:"#2a2a2a",border:"#555",text:"#ccc",badge:"#444"};return lightSportColors[sport]||{bg:"#f5f5f5",border:"#ccc",text:"#333",badge:"#eee"};}

function getChargeCategory(charge){var c=charge.toLowerCase();if(c.includes("dui")||c.includes("vehicular")||c.includes("reckless driving"))return"DUI / Vehicle";if(c.includes("domestic")||c.includes("spousal"))return"Domestic Violence";if(c.includes("murder")||c.includes("manslaughter")||c.includes("homicide"))return"Murder / Manslaughter";if(c.includes("assault")||c.includes("battery")||c.includes("threats"))return"Assault / Battery";if(c.includes("sexual")||c.includes("rape"))return"Sexual Offenses";if(c.includes("drug")||c.includes("cocaine")||c.includes("marijuana")||c.includes("substance"))return"Drugs";if(c.includes("weapon")||c.includes("gun")||c.includes("firearm")||c.includes("pistol"))return"Weapons";if(c.includes("fraud")||c.includes("tax")||c.includes("theft")||c.includes("robbery")||c.includes("bribery")||c.includes("gambling"))return"Fraud / Theft";return"Other";}

function StatsPanel(props) {
  var dark = props.dark;
  var bgCard = dark ? "#111" : "#fff";
  var borderCol = dark ? "#2a2a2a" : "#e0e0e0";
  var textMain = dark ? "#e0e0e0" : "#1a1a1a";
  var textSub = dark ? "#888" : "#666";
  var accent = "#ef4444";
  var sportCounts = {};var categoryCounts = {};var decadeCounts = {};
  Object.values(CRIME_DATABASE).forEach(function(d){sportCounts[d.sport]=(sportCounts[d.sport]||0)+1;d.crimes.forEach(function(c){var cat=getChargeCategory(c.charge);categoryCounts[cat]=(categoryCounts[cat]||0)+1;var dec=Math.floor(c.year/10)*10;decadeCounts[dec]=(decadeCounts[dec]||0)+1;});});
  var sortedSports = Object.entries(sportCounts).sort(function(a,b){return b[1]-a[1];});
  var sortedCats = Object.entries(categoryCounts).sort(function(a,b){return b[1]-a[1];});
  var sortedDecades = Object.entries(decadeCounts).sort(function(a,b){return Number(a[0])-Number(b[0]);});
  var maxSport = Math.max.apply(null,sortedSports.map(function(d){return d[1];}));
  var maxCat = Math.max.apply(null,sortedCats.map(function(d){return d[1];}));
  var maxDecade = Math.max.apply(null,sortedDecades.map(function(d){return d[1];}));

  return (
    <div style={{background:bgCard,border:"1px solid "+borderCol,borderRadius:8,padding:24,marginBottom:28,animation:"fadeSlideIn 0.4s ease forwards"}}>
      <h3 style={{margin:"0 0 20px",fontFamily:"'Oswald', sans-serif",fontSize:18,color:accent,textTransform:"uppercase",letterSpacing:1}}>Database Statistics</h3>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24}}>
        <div>
          <h4 style={{margin:"0 0 12px",fontFamily:"'JetBrains Mono', monospace",fontSize:11,color:textSub,letterSpacing:2,textTransform:"uppercase"}}>Athletes by Sport</h4>
          {sortedSports.map(function(e){var colors=getColor(e[0],dark);return(<div key={e[0]} style={{marginBottom:8}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontSize:12,color:textMain,fontFamily:"'Barlow', sans-serif"}}>{e[0]}</span><span style={{fontSize:11,color:textSub,fontFamily:"'JetBrains Mono', monospace"}}>{e[1]}</span></div><div style={{background:dark?"#1a1a1a":"#eee",borderRadius:4,height:8}}><div style={{height:8,borderRadius:4,background:colors.text,width:(e[1]/maxSport*100)+"%",transition:"width 0.6s ease",minWidth:4}}/></div></div>);})}
        </div>
        <div>
          <h4 style={{margin:"0 0 12px",fontFamily:"'JetBrains Mono', monospace",fontSize:11,color:textSub,letterSpacing:2,textTransform:"uppercase"}}>Charges by Type</h4>
          {sortedCats.map(function(e){return(<div key={e[0]} style={{marginBottom:8}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontSize:12,color:textMain,fontFamily:"'Barlow', sans-serif"}}>{e[0]}</span><span style={{fontSize:11,color:textSub,fontFamily:"'JetBrains Mono', monospace"}}>{e[1]}</span></div><div style={{background:dark?"#1a1a1a":"#eee",borderRadius:4,height:8}}><div style={{height:8,borderRadius:4,background:accent,width:(e[1]/maxCat*100)+"%",transition:"width 0.6s ease",minWidth:4}}/></div></div>);})}
        </div>
      </div>
      <div style={{marginTop:20}}>
        <h4 style={{margin:"0 0 12px",fontFamily:"'JetBrains Mono', monospace",fontSize:11,color:textSub,letterSpacing:2,textTransform:"uppercase"}}>Incidents by Decade</h4>
        <div style={{display:"flex",alignItems:"flex-end",gap:6,height:80}}>
          {sortedDecades.map(function(e){var pct=e[1]/maxDecade;return(<div key={e[0]} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}><span style={{fontSize:10,color:textSub,fontFamily:"'JetBrains Mono', monospace"}}>{e[1]}</span><div style={{width:"100%",borderRadius:"3px 3px 0 0",background:"linear-gradient(180deg, "+accent+", "+accent+"66)",height:Math.max(pct*60,6),transition:"height 0.6s ease"}}/><span style={{fontSize:9,color:textSub,fontFamily:"'JetBrains Mono', monospace"}}>{e[0]}s</span></div>);})}
        </div>
      </div>
    </div>
  );
}

function DisclaimerModal(props) {
  var onClose=props.onClose;var dark=props.dark;
  return (
    <div style={{position:"fixed",inset:0,zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,0.85)",backdropFilter:"blur(6px)",padding:20}} onClick={onClose}>
      <div onClick={function(e){e.stopPropagation();}} style={{background:dark?"#111":"#fff",border:"1px solid "+(dark?"#2a2a2a":"#ddd"),borderRadius:8,maxWidth:700,width:"100%",maxHeight:"80vh",overflowY:"auto",padding:"32px 36px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <h2 style={{margin:0,fontFamily:"'Oswald', sans-serif",fontSize:24,color:"#ef4444",textTransform:"uppercase",letterSpacing:1}}>Legal Disclaimer</h2>
          <span onClick={onClose} style={{color:dark?"#555":"#999",cursor:"pointer",fontSize:22,padding:4}}>X</span>
        </div>
        <div style={{fontFamily:"'Barlow', sans-serif",fontSize:14,color:dark?"#aaa":"#555",lineHeight:1.8}}>
          <p style={{color:dark?"#ddd":"#222",fontWeight:600,marginTop:0}}>PLEASE READ THIS DISCLAIMER CAREFULLY BEFORE USING THIS WEBSITE.</p>
          <p><strong style={{color:dark?"#ccc":"#333"}}>Informational Purposes Only.</strong> Pro Sports Crime Tracker is an independently operated website that compiles publicly available information about criminal charges, arrests, and legal proceedings involving professional athletes. This site is intended for informational and educational purposes only. Nothing on this site constitutes legal advice, a legal opinion, or a determination of guilt or innocence.</p>
          <p><strong style={{color:dark?"#ccc":"#333"}}>Public Record Information.</strong> All information presented on this website is derived from publicly available sources including news reports, court records, police reports, and other public documents. We do not conduct independent investigations. The inclusion of any individual on this site does not constitute an accusation of criminal behavior by this website.</p>
          <p><strong style={{color:dark?"#ccc":"#333"}}>Presumption of Innocence.</strong> An arrest or criminal charge does not mean an individual is guilty. All individuals are presumed innocent until proven guilty in a court of law. Where applicable, we have noted acquittals, dismissed charges, and other favorable outcomes.</p>
          <p><strong style={{color:dark?"#ccc":"#333"}}>No Guarantee of Accuracy.</strong> While we strive to maintain accurate and up-to-date information, we make no warranties or representations regarding the completeness, accuracy, reliability, or currentness of the information provided. We encourage users to verify information through official court records and authoritative news sources.</p>
          <p><strong style={{color:dark?"#ccc":"#333"}}>Not Affiliated With Any League or Team.</strong> This website is not affiliated with, endorsed by, sponsored by, or in any way officially connected to the NFL, NBA, MLB, NHL, UFC, PGA, or any sports league, team, or player association.</p>
          <p><strong style={{color:dark?"#ccc":"#333"}}>No Defamatory Intent.</strong> This website does not intend to defame, disparage, or harm the reputation of any individual. The information presented consists of factual reporting of public legal proceedings.</p>
          <p><strong style={{color:dark?"#ccc":"#333"}}>External Links.</strong> This website may contain links to external sites for further research. We are not responsible for the content, accuracy, or privacy practices of any third-party websites.</p>
          <p><strong style={{color:dark?"#ccc":"#333"}}>Limitation of Liability.</strong> Under no circumstances shall Pro Sports Crime Tracker, its creators, operators, or contributors be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from the use of this website or the information contained herein.</p>
          <p><strong style={{color:dark?"#ccc":"#333"}}>Fair Use.</strong> This site constitutes a fair use of publicly available information for purposes of commentary, criticism, news reporting, research, and education, as provided under applicable law.</p>
          <p style={{color:dark?"#666":"#999",marginTop:24,fontSize:12,fontFamily:"'JetBrains Mono', monospace"}}>By using this website, you acknowledge that you have read, understood, and agree to be bound by this disclaimer.</p>
        </div>
        <button onClick={onClose} style={{marginTop:20,width:"100%",padding:"12px",background:"#ef4444",color:"#fff",border:"none",borderRadius:4,cursor:"pointer",fontFamily:"'Oswald', sans-serif",fontSize:14,fontWeight:600,letterSpacing:1,textTransform:"uppercase"}}>I Understand</button>
      </div>
    </div>
  );
}

function AthleteCard(props) {
  var name=props.name;var data=props.data;var dark=props.dark;var expanded=props.expanded;var onToggle=props.onToggle;
  var colors=getColor(data.sport,dark);var textMain=dark?"#d4d4d4":"#333";var textSub=dark?"#888":"#777";
  return (
    <div onClick={onToggle} style={{background:dark?"linear-gradient(135deg, "+colors.bg+", #0d0d0d)":"linear-gradient(135deg, "+colors.bg+", #ffffff)",border:"1px solid "+colors.border,borderRadius:6,padding:"20px 24px",cursor:"pointer",transition:"all 0.25s ease",position:"relative",overflow:"hidden",animation:"fadeSlideIn 0.4s ease forwards",opacity:0}}
      onMouseEnter={function(e){e.currentTarget.style.borderColor=colors.text;e.currentTarget.style.transform="translateY(-2px)";}}
      onMouseLeave={function(e){e.currentTarget.style.borderColor=colors.border;e.currentTarget.style.transform="translateY(0)";}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg, transparent, "+colors.text+", transparent)"}}/>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12}}>
        <div style={{flex:1}}>
          <h3 style={{margin:0,fontFamily:"'Oswald', sans-serif",fontSize:22,fontWeight:700,color:dark?"#f0f0f0":"#111",letterSpacing:"0.5px",textTransform:"uppercase"}}>{name}</h3>
          <div style={{display:"flex",gap:8,marginTop:8,flexWrap:"wrap",alignItems:"center"}}>
            <span style={{background:colors.badge,color:colors.text,padding:"2px 10px",borderRadius:3,fontSize:11,fontFamily:"'JetBrains Mono', monospace",fontWeight:600,letterSpacing:"1px",textTransform:"uppercase"}}>{data.sport}</span>
            <span style={{color:textSub,fontSize:13,fontFamily:"'JetBrains Mono', monospace"}}>{data.team}</span>
            {data.position&&<span style={{color:dark?"#666":"#999",fontSize:12}}>{"- "+data.position}</span>}
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
          <span style={{background:data.crimes.length>=3?(dark?"#7f1d1d":"#fecaca"):data.crimes.length>=2?(dark?"#78350f":"#fef3c7"):(dark?"#1c1917":"#f5f5f4"),color:data.crimes.length>=3?(dark?"#fca5a5":"#b91c1c"):data.crimes.length>=2?(dark?"#fbbf24":"#92400e"):(dark?"#a8a29e":"#78716c"),padding:"3px 10px",borderRadius:3,fontSize:12,fontFamily:"'JetBrains Mono', monospace",fontWeight:700}}>{data.crimes.length+(data.crimes.length!==1?" CHARGES":" CHARGE")}</span>
          <span style={{color:dark?"#555":"#bbb",fontSize:18,transform:expanded?"rotate(180deg)":"rotate(0)",transition:"transform 0.2s"}}>&#9662;</span>
        </div>
      </div>
      {expanded&&(
        <div style={{marginTop:20,borderTop:"1px solid "+colors.border+"44",paddingTop:16}}>
          {data.crimes.map(function(crime,i){return(
            <div key={i} style={{marginBottom:i<data.crimes.length-1?16:0,paddingLeft:16,borderLeft:"2px solid "+colors.text+"33"}}>
              <span style={{fontFamily:"'JetBrains Mono', monospace",fontSize:13,color:colors.text,fontWeight:700}}>{crime.year}</span>
              <p style={{margin:"4px 0",fontSize:14,color:textMain,lineHeight:1.5}}>{crime.charge}</p>
              <p style={{margin:0,fontSize:13,color:textSub,lineHeight:1.4,fontStyle:"italic"}}>{"-> "+crime.outcome}</p>
              <a href={"https://www.google.com/search?q="+encodeURIComponent(name+" "+crime.charge+" "+crime.year+" court case")} target="_blank" rel="noopener noreferrer" onClick={function(e){e.stopPropagation();}} style={{display:"inline-block",marginTop:8,fontSize:11,fontFamily:"'JetBrains Mono', monospace",fontWeight:600,color:colors.text,textDecoration:"none",padding:"4px 10px",border:"1px solid "+colors.text+"44",borderRadius:3,background:colors.text+"0a"}}>SEARCH CASE RECORDS</a>
            </div>);})}
          <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:16}}>
            <a href={"https://www.google.com/search?q="+encodeURIComponent(name+" criminal record court documents")} target="_blank" rel="noopener noreferrer" onClick={function(e){e.stopPropagation();}} style={{fontSize:12,fontFamily:"'JetBrains Mono', monospace",fontWeight:600,color:dark?"#e0e0e0":"#333",textDecoration:"none",padding:"7px 14px",border:"1px solid "+(dark?"#ffffff22":"#ccc"),borderRadius:4,background:dark?"#ffffff0a":"#f5f5f5"}}>COURT RECORDS</a>
            <a href={"https://news.google.com/search?q="+encodeURIComponent(name+" arrest charges")} target="_blank" rel="noopener noreferrer" onClick={function(e){e.stopPropagation();}} style={{fontSize:12,fontFamily:"'JetBrains Mono', monospace",fontWeight:600,color:dark?"#e0e0e0":"#333",textDecoration:"none",padding:"7px 14px",border:"1px solid "+(dark?"#ffffff22":"#ccc"),borderRadius:4,background:dark?"#ffffff0a":"#f5f5f5"}}>NEWS COVERAGE</a>
          </div>
          {data.status&&(<div style={{marginTop:14,padding:"8px 12px",background:dark?"#ffffff06":"#f5f5f5",borderRadius:4,fontSize:12,color:dark?"#999":"#666",fontFamily:"'JetBrains Mono', monospace"}}>{"STATUS: "+data.status}</div>)}
        </div>
      )}
    </div>
  );
}

export default function ProSportsCrimeTracker() {
  var _q=useState("");var query=_q[0];var setQuery=_q[1];
  var _sf=useState("ALL");var sportFilter=_sf[0];var setSportFilter=_sf[1];
  var _ss=useState(false);var showSuggestions=_ss[0];var setShowSuggestions=_ss[1];
  var _sd=useState(false);var showDisclaimer=_sd[0];var setShowDisclaimer=_sd[1];
  var _dm=useState(true);var darkMode=_dm[0];var setDarkMode=_dm[1];
  var _so=useState("alpha");var sortBy=_so[0];var setSortBy=_so[1];
  var _sp=useState(false);var showStats=_sp[0];var setShowStats=_sp[1];
  var _ex=useState(null);var expandedCard=_ex[0];var setExpandedCard=_ex[1];
  var inputRef=useRef(null);var containerRef=useRef(null);
  var sportSet=new Set(Object.values(CRIME_DATABASE).map(function(d){return d.sport;}));
  var sports=["ALL"].concat(Array.from(sportSet).sort());
  var filtered=ALL_NAMES.filter(function(name){var data=CRIME_DATABASE[name];var mq=name.toLowerCase().includes(query.toLowerCase())||data.team.toLowerCase().includes(query.toLowerCase());var ms=sportFilter==="ALL"||data.sport===sportFilter;return mq&&ms;});
  if(sortBy==="recent"){filtered.sort(function(a,b){return Math.max.apply(null,CRIME_DATABASE[b].crimes.map(function(c){return c.year;}))-Math.max.apply(null,CRIME_DATABASE[a].crimes.map(function(c){return c.year;}));});}
  else if(sortBy==="charges"){filtered.sort(function(a,b){return CRIME_DATABASE[b].crimes.length-CRIME_DATABASE[a].crimes.length;});}
  var suggestions=query.length>0?ALL_NAMES.filter(function(n){return n.toLowerCase().includes(query.toLowerCase());}).slice(0,6):[];
  useEffect(function(){var handler=function(e){if(containerRef.current&&!containerRef.current.contains(e.target))setShowSuggestions(false);};document.addEventListener("mousedown",handler);return function(){document.removeEventListener("mousedown",handler);};},[]);
  var totalCrimes=Object.values(CRIME_DATABASE).reduce(function(s,d){return s+d.crimes.length;},0);
  var bg=darkMode?"#0a0a0a":"#f8f8f8";var textMain=darkMode?"#e0e0e0":"#1a1a1a";var textSub=darkMode?"#666":"#999";var inputBg=darkMode?"#111":"#fff";var inputBorder=darkMode?"#2a2a2a":"#ddd";var accent="#ef4444";

  return (
    <div style={{minHeight:"100vh",background:bg,color:textMain,position:"relative",overflow:"hidden"}}>
      {darkMode&&<div style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none",opacity:0.03,background:"repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)"}}/>}
      {showDisclaimer&&<DisclaimerModal onClose={function(){setShowDisclaimer(false);}} dark={darkMode}/>}
      <style>{
        "@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Barlow:wght@300;400;500;600&display=swap');"+
        "@keyframes fadeSlideIn{from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:translateY(0);}}"+
        "@keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.5;}}"+
        "@keyframes headerGlow{0%,100%{text-shadow:0 0 20px #ef444444,0 0 40px #ef444422;}50%{text-shadow:0 0 30px #ef444466,0 0 60px #ef444433;}}"+
        "*{box-sizing:border-box;}"+
        "input::placeholder{color:"+(darkMode?"#555":"#bbb")+";}"
      }</style>
      <div style={{position:"relative",zIndex:2,maxWidth:800,margin:"0 auto",padding:"40px 20px 60px"}}>
        <div style={{position:"absolute",top:20,right:20}}>
          <button onClick={function(){setDarkMode(!darkMode);}} style={{background:darkMode?"#222":"#eee",border:"1px solid "+(darkMode?"#444":"#ccc"),borderRadius:20,padding:"6px 14px",cursor:"pointer",fontSize:13,fontFamily:"'JetBrains Mono', monospace",color:darkMode?"#ccc":"#555"}}>{darkMode?"LIGHT":"DARK"}</button>
        </div>
        <div style={{textAlign:"center",marginBottom:40}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,marginBottom:12}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:accent,animation:"pulse 2s infinite"}}/>
            <span style={{fontFamily:"'JetBrains Mono', monospace",fontSize:11,color:accent,letterSpacing:3,textTransform:"uppercase",fontWeight:600}}>Live Database</span>
          </div>
          <h1 style={{fontFamily:"'Oswald', sans-serif",fontSize:"clamp(36px, 7vw, 56px)",fontWeight:700,margin:0,letterSpacing:2,textTransform:"uppercase",lineHeight:1.1,background:darkMode?"linear-gradient(180deg, #ffffff 0%, #ef4444 100%)":"linear-gradient(180deg, #111 0%, #ef4444 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",animation:darkMode?"headerGlow 4s ease-in-out infinite":"none"}}>Pro Sports<br/>Crime Tracker</h1>
          <p style={{fontFamily:"'Barlow', sans-serif",color:textSub,fontSize:14,marginTop:12,fontWeight:300,letterSpacing:1}}>SEARCHABLE DATABASE OF ATHLETE CRIMINAL RECORDS</p>
          <div style={{display:"flex",justifyContent:"center",gap:8,marginTop:12}}>
            <button onClick={function(){setShowDisclaimer(true);}} style={{background:"transparent",border:"1px solid "+(darkMode?"#333":"#ccc"),borderRadius:4,color:textSub,padding:"5px 14px",cursor:"pointer",fontSize:11,fontFamily:"'JetBrains Mono', monospace",letterSpacing:1}}>LEGAL DISCLAIMER</button>
            <button onClick={function(){setShowStats(!showStats);}} style={{background:showStats?accent:"transparent",border:"1px solid "+(showStats?accent:(darkMode?"#333":"#ccc")),borderRadius:4,color:showStats?"#fff":textSub,padding:"5px 14px",cursor:"pointer",fontSize:11,fontFamily:"'JetBrains Mono', monospace",letterSpacing:1}}>{showStats?"HIDE STATS":"SHOW STATS"}</button>
          </div>
          <div style={{display:"flex",justifyContent:"center",gap:32,marginTop:20}}>
            <div><div style={{fontFamily:"'Oswald', sans-serif",fontSize:28,fontWeight:700,color:accent}}>{ALL_NAMES.length}</div><div style={{fontFamily:"'JetBrains Mono', monospace",fontSize:10,color:textSub,letterSpacing:2}}>ATHLETES</div></div>
            <div><div style={{fontFamily:"'Oswald', sans-serif",fontSize:28,fontWeight:700,color:accent}}>{totalCrimes}</div><div style={{fontFamily:"'JetBrains Mono', monospace",fontSize:10,color:textSub,letterSpacing:2}}>CHARGES</div></div>
            <div><div style={{fontFamily:"'Oswald', sans-serif",fontSize:28,fontWeight:700,color:accent}}>{sports.length-1}</div><div style={{fontFamily:"'JetBrains Mono', monospace",fontSize:10,color:textSub,letterSpacing:2}}>SPORTS</div></div>
          </div>
        </div>
        {showStats&&<StatsPanel dark={darkMode}/>}
        <div style={{marginBottom:24,padding:"16px 20px",background:inputBg,border:"1px solid "+inputBorder,borderRadius:6}}>
          <h4 style={{margin:"0 0 12px",fontFamily:"'JetBrains Mono', monospace",fontSize:11,color:accent,letterSpacing:2,textTransform:"uppercase"}}>Recently Added</h4>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {RECENTLY_ADDED.map(function(n){var d=CRIME_DATABASE[n];var c=getColor(d.sport,darkMode);return(<span key={n} onClick={function(){setQuery(n);}} style={{padding:"4px 10px",borderRadius:3,fontSize:12,cursor:"pointer",fontFamily:"'Barlow', sans-serif",background:c.badge,color:c.text,border:"1px solid "+c.border}}>{n}</span>);})}
          </div>
        </div>
        <div ref={containerRef} style={{position:"relative",marginBottom:20}}>
          <div style={{display:"flex",alignItems:"center",background:inputBg,border:"1px solid "+inputBorder,borderRadius:6,padding:"0 16px"}}>
            <span style={{color:accent,fontSize:18,marginRight:12}}>&#9740;</span>
            <input ref={inputRef} type="text" value={query} onChange={function(e){setQuery(e.target.value);setShowSuggestions(true);}} onFocus={function(){setShowSuggestions(true);}} placeholder="Search athlete name or team..." style={{flex:1,background:"transparent",border:"none",outline:"none",color:textMain,fontFamily:"'Barlow', sans-serif",fontSize:16,padding:"14px 0"}}/>
            {query&&<span onClick={function(){setQuery("");inputRef.current.focus();}} style={{color:textSub,cursor:"pointer",fontSize:14,padding:4}}>X</span>}
          </div>
          {showSuggestions&&suggestions.length>0&&(
            <div style={{position:"absolute",top:"100%",left:0,right:0,zIndex:10,background:darkMode?"#151515":"#fff",border:"1px solid "+inputBorder,borderTop:"none",borderRadius:"0 0 6px 6px",overflow:"hidden"}}>
              {suggestions.map(function(sN){var d=CRIME_DATABASE[sN];var c=getColor(d.sport,darkMode);return(
                <div key={sN} onClick={function(){setQuery(sN);setShowSuggestions(false);}} style={{padding:"10px 16px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}} onMouseEnter={function(e){e.currentTarget.style.background=darkMode?"#1a1a1a":"#f5f5f5";}} onMouseLeave={function(e){e.currentTarget.style.background="transparent";}}>
                  <span style={{fontFamily:"'Barlow', sans-serif",fontSize:14,color:darkMode?"#ccc":"#333"}}>{sN}</span>
                  <span style={{fontSize:10,color:c.text,fontFamily:"'JetBrains Mono', monospace",background:c.badge,padding:"1px 6px",borderRadius:2}}>{d.sport}</span>
                </div>);})}
            </div>
          )}
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12,marginBottom:20}}>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {sports.map(function(sport){var active=sportFilter===sport;var c=sport==="ALL"?{text:accent,badge:darkMode?"#1c1917":"#fee2e2"}:getColor(sport,darkMode);return(<button key={sport} onClick={function(){setSportFilter(sport);}} style={{background:active?(sport==="ALL"?accent:c.badge):"transparent",color:active?"#fff":textSub,border:"1px solid "+(active?(sport==="ALL"?accent:c.text):(darkMode?"#222":"#ddd")),borderRadius:4,padding:"5px 12px",cursor:"pointer",fontFamily:"'JetBrains Mono', monospace",fontSize:11,fontWeight:600,letterSpacing:"0.5px",textTransform:"uppercase"}}>{sport}</button>);})}
          </div>
          <div style={{display:"flex",gap:4}}>
            {[{key:"alpha",label:"A-Z"},{key:"recent",label:"RECENT"},{key:"charges",label:"MOST CHARGES"}].map(function(opt){var active=sortBy===opt.key;return(<button key={opt.key} onClick={function(){setSortBy(opt.key);}} style={{background:active?accent:"transparent",color:active?"#fff":textSub,border:"1px solid "+(active?accent:(darkMode?"#222":"#ddd")),borderRadius:4,padding:"4px 10px",cursor:"pointer",fontFamily:"'JetBrains Mono', monospace",fontSize:10,fontWeight:600,letterSpacing:"0.5px"}}>{opt.label}</button>);})}
          </div>
        </div>
        <div style={{fontFamily:"'JetBrains Mono', monospace",fontSize:12,color:darkMode?"#444":"#bbb",marginBottom:16,letterSpacing:1}}>{filtered.length+" RESULT"+(filtered.length!==1?"S":"")+(query?(" FOR \""+query.toUpperCase()+"\""):"")}</div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {filtered.length===0?(
            <div style={{textAlign:"center",padding:60,color:textSub}}>
              <div style={{fontSize:48,marginBottom:12}}>&#8856;</div>
              <div style={{fontFamily:"'Barlow', sans-serif",fontSize:16}}>No records found</div>
              <div style={{fontFamily:"'JetBrains Mono', monospace",fontSize:12,marginTop:8}}>Try a different search or filter</div>
            </div>
          ):(filtered.map(function(aName,i){return(<div key={aName} style={{animationDelay:(i*0.05)+"s"}}><AthleteCard name={aName} data={CRIME_DATABASE[aName]} dark={darkMode} expanded={expandedCard===aName} onToggle={function(){setExpandedCard(expandedCard===aName?null:aName);}}/></div>);}))}
        </div>
        <div style={{textAlign:"center",marginTop:48,padding:"20px 0",borderTop:"1px solid "+(darkMode?"#1a1a1a":"#eee")}}>
          <button onClick={function(){setShowDisclaimer(true);}} style={{background:"transparent",border:"none",color:darkMode?"#444":"#bbb",cursor:"pointer",fontFamily:"'JetBrains Mono', monospace",fontSize:11,letterSpacing:1,textDecoration:"underline",display:"block",margin:"0 auto 12px"}}>Legal Disclaimer</button>
          <p style={{fontFamily:"'JetBrains Mono', monospace",fontSize:10,color:darkMode?"#333":"#ccc",letterSpacing:1,margin:0}}>ALL INFORMATION IS SOURCED FROM PUBLIC RECORDS AND NEWS REPORTS.<br/>INCLUSION DOES NOT IMPLY GUILT WHERE ACQUITTALS OR DISMISSALS OCCURRED.<br/>THIS SITE IS NOT AFFILIATED WITH ANY SPORTS LEAGUE, TEAM, OR PLAYER ASSOCIATION.</p>
        </div>
      </div>
    </div>
  );
}

