import { useState, useRef, useEffect } from "react";

const CRIME_DATABASE = {
  "Aaron Hernandez": { sport: "NFL", team: "New England Patriots", position: "TE", crimes: [{ year: 2013, charge: "First-degree murder (Odin Lloyd)", outcome: "Convicted, sentenced to life without parole" }, { year: 2014, charge: "Double murder charges (Daniel de Abreu & Safiro Furtado)", outcome: "Acquitted" }], status: "Deceased (2017)" },
  "Michael Vick": { sport: "NFL", team: "Atlanta Falcons", position: "QB", crimes: [{ year: 2007, charge: "Conspiracy to operate an illegal dogfighting ring", outcome: "Guilty plea, 21 months federal prison" }], status: "Released, returned to NFL" },
  "Ray Rice": { sport: "NFL", team: "Baltimore Ravens", position: "RB", crimes: [{ year: 2014, charge: "Aggravated assault (domestic violence)", outcome: "Pretrial intervention program, charges dismissed" }], status: "Released by Ravens, indefinitely suspended" },
  "O.J. Simpson": { sport: "NFL", team: "Buffalo Bills", position: "RB", crimes: [{ year: 1995, charge: "Double murder (Nicole Brown Simpson & Ron Goldman)", outcome: "Acquitted (found liable in civil trial)" }, { year: 2007, charge: "Armed robbery & kidnapping", outcome: "Convicted, sentenced to 33 years (paroled 2017)" }], status: "Deceased (2024)" },
  "Rae Carruth": { sport: "NFL", team: "Carolina Panthers", position: "WR", crimes: [{ year: 1999, charge: "Conspiracy to commit murder (Cherica Adams)", outcome: "Convicted, sentenced to 18-24 years" }], status: "Released from prison (2018)" },
  "Plaxico Burress": { sport: "NFL", team: "New York Giants", position: "WR", crimes: [{ year: 2008, charge: "Criminal possession of a weapon (accidental self-shooting)", outcome: "Guilty plea, 2 years prison" }], status: "Served sentence, returned to NFL" },
  "Darren Sharper": { sport: "NFL", team: "Multiple teams", position: "S", crimes: [{ year: 2014, charge: "Multiple counts of rape across several states", outcome: "Convicted, sentenced to 18 years federal prison" }], status: "Incarcerated" },
  "Adam 'Pacman' Jones": { sport: "NFL", team: "Tennessee Titans / Bengals", position: "CB", crimes: [{ year: 2007, charge: "Involvement in strip club shooting (Las Vegas)", outcome: "No criminal charges filed, NFL suspension" }, { year: 2013, charge: "Assault", outcome: "Misdemeanor charges" }], status: "Multiple arrests throughout career" },
  "Donte Stallworth": { sport: "NFL", team: "Cleveland Browns", position: "WR", crimes: [{ year: 2009, charge: "DUI manslaughter (Mario Reyes)", outcome: "Guilty plea, 30 days jail + 2 years house arrest" }], status: "Returned to NFL after suspension" },
  "Henry Ruggs III": { sport: "NFL", team: "Las Vegas Raiders", position: "WR", crimes: [{ year: 2021, charge: "DUI resulting in death (Tina Tintor)", outcome: "Guilty plea, sentenced to 3-10 years prison" }], status: "Released by Raiders, incarcerated" },
  "Tyreek Hill": { sport: "NFL", team: "Kansas City Chiefs / Miami Dolphins", position: "WR", crimes: [{ year: 2015, charge: "Domestic assault & battery of pregnant girlfriend", outcome: "Guilty plea, 3 years probation, anger management" }], status: "Active in NFL" },
  "Deshaun Watson": { sport: "NFL", team: "Houston Texans / Cleveland Browns", position: "QB", crimes: [{ year: 2021, charge: "Multiple civil lawsuits alleging sexual misconduct (24+ women)", outcome: "Two grand juries declined criminal charges; civil settlements" }], status: "11-game NFL suspension, $5M fine" },
  "Greg Hardy": { sport: "NFL", team: "Carolina Panthers / Dallas Cowboys", position: "DE", crimes: [{ year: 2014, charge: "Assault on a female & communicating threats", outcome: "Initially convicted, charges dismissed on appeal (victim did not appear)" }], status: "Left NFL" },
  "Sebastian Janikowski": { sport: "NFL", team: "Oakland Raiders", position: "K", crimes: [{ year: 2000, charge: "Attempted bribery of a police officer & GHB possession", outcome: "GHB charge dropped, acquitted of bribery" }], status: "Retired" },
  "Leonard Little": { sport: "NFL", team: "St. Louis Rams", position: "DE", crimes: [{ year: 1998, charge: "Involuntary manslaughter (DUI death of Susan Gutweiler)", outcome: "Guilty plea, 90 days jail, 1000 hours community service" }, { year: 2004, charge: "Second DUI arrest", outcome: "Acquitted" }], status: "Retired" },
  "Jovan Belcher": { sport: "NFL", team: "Kansas City Chiefs", position: "LB", crimes: [{ year: 2012, charge: "Murder-suicide (killed Kasandra Perkins, then himself)", outcome: "Deceased before charges could be filed" }], status: "Deceased (2012)" },
  "Jim Brown": { sport: "NFL", team: "Cleveland Browns", position: "RB", crimes: [{ year: 1965, charge: "Assault (paternity suit complainant thrown from balcony allegation)", outcome: "Acquitted" }, { year: 1999, charge: "Vandalism (smashing wife's car)", outcome: "Convicted, 6 months jail (refused probation terms)" }], status: "Deceased (2023)" },
  "Mark Chmura": { sport: "NFL", team: "Green Bay Packers", position: "TE", crimes: [{ year: 2000, charge: "Sexual assault of minor (babysitter at post-prom party)", outcome: "Acquitted" }], status: "Career ended" },
  "Daryl Washington": { sport: "NFL", team: "Arizona Cardinals", position: "LB", crimes: [{ year: 2013, charge: "Aggravated assault (domestic violence against girlfriend)", outcome: "Guilty plea, suspended indefinitely by NFL" }], status: "Left NFL" },
  "Richie Incognito": { sport: "NFL", team: "Miami Dolphins / Bills / Raiders", position: "OG", crimes: [{ year: 2018, charge: "Threats & disorderly conduct at a funeral home", outcome: "Involuntary psychiatric hold, charges dropped" }, { year: 2020, charge: "Disorderly conduct", outcome: "Charges resolved" }], status: "Retired" },
  "Antonio Brown": { sport: "NFL", team: "Pittsburgh Steelers / Buccaneers", position: "WR", crimes: [{ year: 2020, charge: "Burglary, battery & criminal mischief (moving truck driver altercation)", outcome: "Plea deal, 2 years probation, community service" }], status: "Left NFL" },
  "Kareem Hunt": { sport: "NFL", team: "Kansas City Chiefs / Cleveland Browns", position: "RB", crimes: [{ year: 2018, charge: "Assault (hotel incident caught on video)", outcome: "No criminal charges filed; 8-game NFL suspension" }], status: "Active in NFL" },
  "Ray Lewis": { sport: "NFL", team: "Baltimore Ravens", position: "LB", crimes: [{ year: 2000, charge: "Murder charges (double stabbing at Super Bowl party)", outcome: "Murder charges dropped; guilty plea to obstruction of justice" }], status: "Retired, Hall of Famer" },
  "Travis Henry": { sport: "NFL", team: "Buffalo Bills / Broncos", position: "RB", crimes: [{ year: 2008, charge: "Conspiracy to distribute cocaine", outcome: "Convicted, 3 years federal prison" }], status: "Served sentence" },
  "Marshawn Lynch": { sport: "NFL", team: "Seattle Seahawks / Raiders", position: "RB", crimes: [{ year: 2012, charge: "DUI", outcome: "Guilty plea, reduced charges" }, { year: 2019, charge: "DUI (Las Vegas)", outcome: "Charges pending, resolved" }], status: "Retired" },
  "Aldon Smith": { sport: "NFL", team: "San Francisco 49ers / Raiders", position: "LB", crimes: [{ year: 2013, charge: "DUI & marijuana possession", outcome: "Guilty plea" }, { year: 2014, charge: "Bomb threat at LAX airport", outcome: "Guilty plea" }, { year: 2018, charge: "DUI (second offense)", outcome: "Charges filed" }], status: "Multiple suspensions, left NFL" },
  "Justin Blackmon": { sport: "NFL", team: "Jacksonville Jaguars", position: "WR", crimes: [{ year: 2012, charge: "DUI arrest", outcome: "Guilty plea" }, { year: 2013, charge: "Marijuana possession & second DUI", outcome: "Indefinite NFL suspension" }], status: "Indefinitely suspended, never returned" },
  "Josh Gordon": { sport: "NFL", team: "Cleveland Browns / Multiple", position: "WR", crimes: [{ year: 2016, charge: "DUI arrest", outcome: "Charges resolved" }, { year: 2020, charge: "Multiple substance abuse policy violations", outcome: "Repeated NFL suspensions" }], status: "Multiple reinstatements and suspensions" },
  "Kobe Bryant": { sport: "NBA", team: "Los Angeles Lakers", position: "SG", crimes: [{ year: 2003, charge: "Sexual assault allegation (Eagle, Colorado)", outcome: "Criminal case dropped after accuser refused to testify; civil settlement" }], status: "Deceased (2020)" },
  "Allen Iverson": { sport: "NBA", team: "Philadelphia 76ers", position: "PG", crimes: [{ year: 1993, charge: "Maiming by mob (bowling alley brawl)", outcome: "Convicted, later granted clemency by governor" }, { year: 2002, charge: "Threats, carrying a firearm", outcome: "Charges dropped or reduced" }], status: "Retired" },
  "Jayson Williams": { sport: "NBA", team: "New Jersey Nets", position: "C", crimes: [{ year: 2002, charge: "Manslaughter (Costas Christofi, limousine driver)", outcome: "Guilty plea to aggravated assault, 18 months prison" }], status: "Served sentence" },
  "Gilbert Arenas": { sport: "NBA", team: "Washington Wizards", position: "PG", crimes: [{ year: 2009, charge: "Carrying a pistol without a license (guns in locker room)", outcome: "Guilty plea, 30 days halfway house, 2 years probation" }], status: "Suspended by NBA, career declined" },
  "Ron Artest (Metta World Peace)": { sport: "NBA", team: "Indiana Pacers", position: "SF", crimes: [{ year: 2004, charge: "Assault (Malice at the Palace brawl)", outcome: "Season-long suspension, misdemeanor assault charge" }, { year: 2007, charge: "Domestic violence", outcome: "Guilty plea, 20 days community service" }], status: "Retired" },
  "Dennis Rodman": { sport: "NBA", team: "Chicago Bulls / Detroit Pistons", position: "PF", crimes: [{ year: 1999, charge: "DUI & multiple domestic disturbance incidents", outcome: "Various fines, probation, community service" }], status: "Retired, multiple legal issues" },
  "Javaris Crittenton": { sport: "NBA", team: "Washington Wizards / Multiple", position: "PG", crimes: [{ year: 2011, charge: "Murder (Jullian Jones, bystander in drive-by shooting)", outcome: "Convicted, sentenced to 23 years prison" }], status: "Incarcerated" },
  "Jason Kidd": { sport: "NBA", team: "Phoenix Suns / Nets / Mavericks", position: "PG", crimes: [{ year: 2001, charge: "Domestic violence (spousal abuse)", outcome: "Guilty plea to misdemeanor, 6 months counseling" }], status: "Active NBA head coach" },
  "Charles Barkley": { sport: "NBA", team: "Phoenix Suns / Philadelphia 76ers", position: "PF", crimes: [{ year: 1997, charge: "Battery (threw man through bar window)", outcome: "Charges resolved, fined" }, { year: 2008, charge: "DUI", outcome: "Guilty plea, jail time, community service" }], status: "Retired, TV analyst" },
  "Sebastian Telfair": { sport: "NBA", team: "Multiple teams", position: "PG", crimes: [{ year: 2017, charge: "Illegal weapons possession (3 guns, body armor in car)", outcome: "Convicted, sentenced to 3.5 years prison" }], status: "Incarcerated" },
  "Lamar Odom": { sport: "NBA", team: "Los Angeles Lakers / Clippers", position: "PF", crimes: [{ year: 2013, charge: "DUI arrest", outcome: "Guilty plea, no contest" }], status: "Retired" },
  "Zach Randolph": { sport: "NBA", team: "Memphis Grizzlies / Multiple", position: "PF", crimes: [{ year: 2017, charge: "Marijuana possession with intent to sell", outcome: "Charges reduced to misdemeanor" }], status: "Retired" },
  "Jalen Rose": { sport: "NBA", team: "Indiana Pacers / Multiple", position: "SG", crimes: [{ year: 2011, charge: "DUI", outcome: "Guilty plea, 20 days jail" }], status: "Retired, TV analyst" },
  "Lance Stephenson": { sport: "NBA", team: "Indiana Pacers / Multiple", position: "SG", crimes: [{ year: 2010, charge: "Domestic battery (pushing girlfriend down stairs)", outcome: "Charges dropped" }], status: "Played overseas" },
  "Ty Lawson": { sport: "NBA", team: "Denver Nuggets / Multiple", position: "PG", crimes: [{ year: 2015, charge: "Multiple DUI arrests (2 in same year)", outcome: "Guilty plea, jail time, probation" }], status: "Left NBA" },
  "Miles Bridges": { sport: "NBA", team: "Charlotte Hornets", position: "SF", crimes: [{ year: 2022, charge: "Felony domestic violence (assault in front of children)", outcome: "Guilty plea to misdemeanor, 3 years probation" }], status: "Returned to NBA after suspension" },
  "Jaxson Hayes": { sport: "NBA", team: "New Orleans Pelicans", position: "C", crimes: [{ year: 2021, charge: "Domestic violence & resisting arrest (LAPD body cam footage)", outcome: "Guilty plea to misdemeanor, probation" }], status: "Active in NBA" },
  "Pete Rose": { sport: "MLB", team: "Cincinnati Reds", position: "Manager/Player", crimes: [{ year: 1990, charge: "Tax evasion (failure to report gambling income)", outcome: "Guilty plea, 5 months prison" }], status: "Deceased (2024), permanently banned from MLB" },
  "Darryl Strawberry": { sport: "MLB", team: "New York Mets / Yankees", position: "OF", crimes: [{ year: 1999, charge: "Drug possession (cocaine), solicitation of prostitution", outcome: "Multiple arrests, probation violations, prison time" }], status: "Retired, recovered" },
  "Dwight Gooden": { sport: "MLB", team: "New York Mets", position: "P", crimes: [{ year: 1994, charge: "Multiple drug-related charges (cocaine)", outcome: "Suspensions, probation, brief jail time" }], status: "Retired" },
  "Denny McLain": { sport: "MLB", team: "Detroit Tigers", position: "P", crimes: [{ year: 1985, charge: "Racketeering, extortion, cocaine possession", outcome: "Convicted, 23 years sentence (reduced on appeal)" }, { year: 1996, charge: "Theft, mail fraud, money laundering", outcome: "Convicted, 8 years prison" }], status: "Served multiple sentences" },
  "Milton Bradley": { sport: "MLB", team: "Multiple teams", position: "OF", crimes: [{ year: 2011, charge: "Spousal abuse / domestic violence", outcome: "Convicted, 32 months prison" }], status: "Left MLB" },
  "Miguel Cabrera": { sport: "MLB", team: "Detroit Tigers", position: "1B/DH", crimes: [{ year: 2009, charge: "DUI arrest", outcome: "Charges resolved, entered alcohol treatment" }, { year: 2011, charge: "Domestic dispute", outcome: "No charges filed" }], status: "Retired" },
  "Yasiel Puig": { sport: "MLB", team: "Los Angeles Dodgers / Multiple", position: "OF", crimes: [{ year: 2022, charge: "Lying to federal agents regarding illegal gambling operation", outcome: "Guilty plea to federal charge" }], status: "Left MLB" },
  "Felipe Vazquez": { sport: "MLB", team: "Pittsburgh Pirates", position: "P", crimes: [{ year: 2019, charge: "Sexual assault of a minor & solicitation of a child", outcome: "Convicted, sentenced to 2-4 years prison" }], status: "Incarcerated, career over" },
  "Matt Bush": { sport: "MLB", team: "Texas Rangers", position: "P", crimes: [{ year: 2012, charge: "DUI causing serious bodily injury (hit motorcyclist, fled scene)", outcome: "Convicted, 51 months prison" }], status: "Returned to MLB after prison" },
  "Josh Hamilton": { sport: "MLB", team: "Texas Rangers / Angels", position: "OF", crimes: [{ year: 2015, charge: "Injury to a child (eldest daughter, struck during argument)", outcome: "No indictment by grand jury" }], status: "Retired" },
  "Marcell Ozuna": { sport: "MLB", team: "Atlanta Braves", position: "OF/DH", crimes: [{ year: 2021, charge: "Aggravated assault by strangulation (domestic violence)", outcome: "Charges dropped after victim recanted" }, { year: 2023, charge: "DUI arrest", outcome: "Charges resolved" }], status: "Active in MLB" },
  "Trevor Bauer": { sport: "MLB", team: "Los Angeles Dodgers", position: "P", crimes: [{ year: 2021, charge: "Sexual assault allegations (multiple women)", outcome: "No criminal charges filed; 2-year MLB suspension (longest in history for DV)" }], status: "Played in Japan/Mexico" },
  "Addison Russell": { sport: "MLB", team: "Chicago Cubs", position: "SS", crimes: [{ year: 2018, charge: "Domestic violence allegations (ex-wife)", outcome: "40-game MLB suspension" }], status: "Left MLB" },
  "Roberto Osuna": { sport: "MLB", team: "Houston Astros / Toronto Blue Jays", position: "P", crimes: [{ year: 2018, charge: "Assault (domestic violence against mother of his child)", outcome: "Peace bond agreement, 75-game MLB suspension" }], status: "Left MLB" },
  "Slava Voynov": { sport: "NHL", team: "Los Angeles Kings", position: "D", crimes: [{ year: 2014, charge: "Domestic violence (felony corporal injury)", outcome: "Guilty plea to misdemeanor, 90 days jail" }], status: "Contract terminated, deported to Russia" },
  "Mike Danton": { sport: "NHL", team: "St. Louis Blues", position: "C", crimes: [{ year: 2004, charge: "Conspiracy to commit murder (hiring hitman against agent)", outcome: "Guilty plea, 7.5 years prison" }], status: "Released, played in minor leagues" },
  "Craig MacTavish": { sport: "NHL", team: "Boston Bruins / Edmonton Oilers", position: "C", crimes: [{ year: 1984, charge: "Vehicular homicide (DUI death)", outcome: "Convicted, 1 year prison" }], status: "Returned to NHL as player and coach" },
  "Patrick Kane": { sport: "NHL", team: "Chicago Blackhawks", position: "RW", crimes: [{ year: 2009, charge: "Assault & robbery (altercation with cab driver)", outcome: "Charges reduced, non-criminal disposition" }], status: "Active in NHL" },
  "Semyon Varlamov": { sport: "NHL", team: "Colorado Avalanche", position: "G", crimes: [{ year: 2013, charge: "Domestic violence (assault & kidnapping of girlfriend)", outcome: "Charges dismissed" }], status: "Active in NHL" },
  "Evander Kane": { sport: "NHL", team: "San Jose Sharks / Edmonton Oilers", position: "LW", crimes: [{ year: 2016, charge: "Assault allegations (woman in hotel)", outcome: "No charges filed" }, { year: 2021, charge: "Domestic violence allegations (wife), gambling investigation", outcome: "No criminal charges; NHL investigation" }], status: "Active in NHL" },
  "Austin Watson": { sport: "NHL", team: "Nashville Predators", position: "LW", crimes: [{ year: 2018, charge: "Domestic assault (girlfriend at gas station)", outcome: "Guilty plea to misdemeanor, 27-game NHL suspension" }], status: "Left NHL" },
  "Tiger Woods": { sport: "Golf (PGA)", team: "N/A", position: "Golfer", crimes: [{ year: 2017, charge: "DUI (found asleep at wheel under influence of medications)", outcome: "Guilty plea to reckless driving, probation, community service" }], status: "Active on PGA Tour" },
  "Scottie Scheffler": { sport: "Golf (PGA)", team: "N/A", position: "Golfer", crimes: [{ year: 2024, charge: "Assault on a police officer & reckless driving (PGA Championship traffic incident)", outcome: "All charges dismissed" }], status: "Active on PGA Tour" },
  "Oscar Pistorius": { sport: "Track & Field", team: "South Africa", position: "Sprinter", crimes: [{ year: 2013, charge: "Murder (Reeva Steenkamp)", outcome: "Convicted of murder, sentenced to 13 years 5 months" }], status: "Paroled (2024)" },
  "Tonya Harding": { sport: "Figure Skating", team: "USA", position: "Singles skater", crimes: [{ year: 1994, charge: "Conspiracy to hinder prosecution (Nancy Kerrigan attack)", outcome: "Guilty plea, 3 years probation, $160K fine, community service" }], status: "Banned from US Figure Skating for life" },
  "Mike Tyson": { sport: "Boxing", team: "N/A", position: "Heavyweight", crimes: [{ year: 1992, charge: "Rape (Desiree Washington)", outcome: "Convicted, sentenced to 6 years prison (served 3)" }, { year: 1998, charge: "Assault (road rage incident)", outcome: "No contest plea, 1 year probation" }], status: "Retired, media personality" },
  "Floyd Mayweather Jr.": { sport: "Boxing", team: "N/A", position: "Welterweight", crimes: [{ year: 2002, charge: "Domestic battery (two counts)", outcome: "Guilty plea, 2 days jail, community service" }, { year: 2010, charge: "Domestic violence & harassment (Josie Harris)", outcome: "Guilty plea, 90 days jail (served 2 months)" }], status: "Retired" },
  "Conor McGregor": { sport: "MMA (UFC)", team: "N/A", position: "Featherweight/Lightweight", crimes: [{ year: 2018, charge: "Assault & criminal mischief (bus attack at Barclays Center)", outcome: "Plea deal, community service, anger management" }, { year: 2019, charge: "Assault (punching elderly man in pub)", outcome: "Guilty plea, fined" }], status: "Active in UFC" },
  "Jon Jones": { sport: "MMA (UFC)", team: "N/A", position: "Heavyweight", crimes: [{ year: 2012, charge: "DUI", outcome: "Guilty plea" }, { year: 2015, charge: "Hit-and-run (pregnant woman injured)", outcome: "Guilty plea, 18 months probation" }, { year: 2020, charge: "DUI & negligent use of a firearm", outcome: "Guilty plea, probation" }], status: "Active UFC champion" },
  "War Machine (Jon Koppenhaver)": { sport: "MMA (UFC)", team: "N/A", position: "Welterweight", crimes: [{ year: 2014, charge: "Attempted murder, kidnapping, sexual assault (Christy Mack)", outcome: "Convicted, sentenced to life with possibility of parole" }], status: "Incarcerated" },
  "Hope Solo": { sport: "Soccer (NWSL)", team: "US Women's National Team", position: "GK", crimes: [{ year: 2014, charge: "Domestic violence (assault on nephew and half-sister)", outcome: "Charges dropped" }, { year: 2022, charge: "DUI & child abuse (children in car)", outcome: "Guilty plea to DUI" }], status: "Retired" },
  "Lance Armstrong": { sport: "Cycling", team: "US Postal Service Team", position: "Cyclist", crimes: [{ year: 2012, charge: "Federal investigation for fraud, doping conspiracy", outcome: "Criminal charges not pursued; lifetime ban from competition, stripped of 7 Tour de France titles" }], status: "Banned for life" },
  "Marion Jones": { sport: "Track & Field", team: "USA", position: "Sprinter", crimes: [{ year: 2007, charge: "Lying to federal agents about steroid use & check fraud scheme", outcome: "Guilty plea, 6 months federal prison" }], status: "Stripped of Olympic medals" },
};

const ALL_NAMES = Object.keys(CRIME_DATABASE).sort();

const sportColors = {
  "NFL": { bg: "#1a3a1a", border: "#2d6b2d", text: "#4ade80", badge: "#166534" },
  "NBA": { bg: "#3a1a1a", border: "#6b2d2d", text: "#f87171", badge: "#7f1d1d" },
  "MLB": { bg: "#1a2a3a", border: "#2d4d6b", text: "#60a5fa", badge: "#1e3a5f" },
  "NHL": { bg: "#2a2a3a", border: "#4d4d6b", text: "#a78bfa", badge: "#3b3560" },
  "Golf (PGA)": { bg: "#3a3a1a", border: "#6b6b2d", text: "#facc15", badge: "#554400" },
  "Figure Skating": { bg: "#1a3a3a", border: "#2d6b6b", text: "#2dd4bf", badge: "#134e4a" },
  "Boxing": { bg: "#3a1a2a", border: "#6b2d4d", text: "#f472b6", badge: "#5c1035" },
  "MMA (UFC)": { bg: "#3a2a1a", border: "#6b4d2d", text: "#fb923c", badge: "#5c3310" },
  "Soccer (NWSL)": { bg: "#1a3a2a", border: "#2d6b4d", text: "#34d399", badge: "#064e3b" },
  "Cycling": { bg: "#2a3a1a", border: "#4d6b2d", text: "#a3e635", badge: "#365314" },
  "Track & Field": { bg: "#3a2a1a", border: "#6b4d2d", text: "#fb923c", badge: "#5c3310" },
};

const getColor = (sport) => sportColors[sport] || { bg: "#2a2a2a", border: "#555", text: "#ccc", badge: "#444" };

function NoiseOverlay() {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.04,
      backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
    }} />
  );
}

function ScanLine() {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none", opacity: 0.03,
      background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
    }} />
  );
}

function DisclaimerModal({ onClose }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(0,0,0,0.85)", backdropFilter: "blur(6px)", padding: 20,
    }} onClick={onClose}>
      <div onClick={function(e) { e.stopPropagation(); }} style={{
        background: "#111", border: "1px solid #2a2a2a", borderRadius: 8, maxWidth: 700, width: "100%",
        maxHeight: "80vh", overflowY: "auto", padding: "32px 36px",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ margin: 0, fontFamily: "'Oswald', sans-serif", fontSize: 24, color: "#ef4444", textTransform: "uppercase", letterSpacing: 1 }}>Legal Disclaimer</h2>
          <span onClick={onClose} style={{ color: "#555", cursor: "pointer", fontSize: 22, padding: 4 }}>X</span>
        </div>
        <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "#aaa", lineHeight: 1.8 }}>
          <p style={{ color: "#ddd", fontWeight: 600, marginTop: 0 }}>PLEASE READ THIS DISCLAIMER CAREFULLY BEFORE USING THIS WEBSITE.</p>
          <p><strong style={{ color: "#ccc" }}>Informational Purposes Only.</strong> Pro Sports Crime Tracker is an independently operated website that compiles publicly available information about criminal charges, arrests, and legal proceedings involving professional athletes. This site is intended for informational and educational purposes only. Nothing on this site constitutes legal advice, a legal opinion, or a determination of guilt or innocence.</p>
          <p><strong style={{ color: "#ccc" }}>Public Record Information.</strong> All information presented on this website is derived from publicly available sources including news reports, court records, police reports, and other public documents. We do not conduct independent investigations. The inclusion of any individual on this site does not constitute an accusation of criminal behavior by this website.</p>
          <p><strong style={{ color: "#ccc" }}>Presumption of Innocence.</strong> An arrest or criminal charge does not mean an individual is guilty. All individuals are presumed innocent until proven guilty in a court of law. Where applicable, we have noted acquittals, dismissed charges, and other favorable outcomes. Users should not draw conclusions about an individual's guilt or innocence based solely on their inclusion in this database.</p>
          <p><strong style={{ color: "#ccc" }}>No Guarantee of Accuracy.</strong> While we strive to maintain accurate and up-to-date information, we make no warranties or representations regarding the completeness, accuracy, reliability, or currentness of the information provided. Criminal cases evolve over time. Charges may be amended, dropped, or resolved differently than initially reported. We encourage users to verify information through official court records and authoritative news sources.</p>
          <p><strong style={{ color: "#ccc" }}>Not Affiliated With Any League or Team.</strong> This website is not affiliated with, endorsed by, sponsored by, or in any way officially connected to the NFL, NBA, MLB, NHL, UFC, PGA, or any sports league, team, or player association. All team names and league names are used solely for identification purposes.</p>
          <p><strong style={{ color: "#ccc" }}>No Defamatory Intent.</strong> This website does not intend to defame, disparage, or harm the reputation of any individual. The information presented consists of factual reporting of public legal proceedings. Any opinions expressed are clearly identified as such.</p>
          <p><strong style={{ color: "#ccc" }}>External Links.</strong> This website may contain links to external sites for further research. We are not responsible for the content, accuracy, or privacy practices of any third-party websites.</p>
          <p><strong style={{ color: "#ccc" }}>Limitation of Liability.</strong> Under no circumstances shall Pro Sports Crime Tracker, its creators, operators, or contributors be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from the use of, or inability to use, this website or the information contained herein.</p>
          <p><strong style={{ color: "#ccc" }}>Fair Use.</strong> This site constitutes a fair use of publicly available information for purposes of commentary, criticism, news reporting, research, and education, as provided under applicable law.</p>
          <p><strong style={{ color: "#ccc" }}>Changes to This Disclaimer.</strong> We reserve the right to modify this disclaimer at any time. Continued use of this website constitutes acceptance of any changes.</p>
          <p style={{ color: "#666", marginTop: 24, fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>By using this website, you acknowledge that you have read, understood, and agree to be bound by this disclaimer.</p>
        </div>
        <button onClick={onClose} style={{
          marginTop: 20, width: "100%", padding: "12px", background: "#ef4444", color: "#fff",
          border: "none", borderRadius: 4, cursor: "pointer", fontFamily: "'Oswald', sans-serif",
          fontSize: 14, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase",
        }}>
          I Understand
        </button>
      </div>
    </div>
  );
}

function AthleteCard({ name, data }) {
  const [expanded, setExpanded] = useState(false);
  const colors = getColor(data.sport);

  return (
    <div
      onClick={function() { setExpanded(!expanded); }}
      style={{
        background: "linear-gradient(135deg, " + colors.bg + ", #0d0d0d)",
        border: "1px solid " + colors.border,
        borderRadius: 6,
        padding: "20px 24px",
        cursor: "pointer",
        transition: "all 0.25s ease",
        position: "relative",
        overflow: "hidden",
        animation: "fadeSlideIn 0.4s ease forwards",
        opacity: 0,
      }}
      onMouseEnter={function(e) { e.currentTarget.style.borderColor = colors.text; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px " + colors.border + "44"; }}
      onMouseLeave={function(e) { e.currentTarget.style.borderColor = colors.border; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, " + colors.text + ", transparent)" }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: 0, fontFamily: "'Oswald', sans-serif", fontSize: 22, fontWeight: 700, color: "#f0f0f0", letterSpacing: "0.5px", textTransform: "uppercase" }}>{name}</h3>
          <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ background: colors.badge, color: colors.text, padding: "2px 10px", borderRadius: 3, fontSize: 11, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase" }}>{data.sport}</span>
            <span style={{ color: "#888", fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}>{data.team}</span>
            {data.position && <span style={{ color: "#666", fontSize: 12 }}>{"- " + data.position}</span>}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
          <span style={{
            background: data.crimes.length >= 3 ? "#7f1d1d" : data.crimes.length >= 2 ? "#78350f" : "#1c1917",
            color: data.crimes.length >= 3 ? "#fca5a5" : data.crimes.length >= 2 ? "#fbbf24" : "#a8a29e",
            padding: "3px 10px", borderRadius: 3, fontSize: 12, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700
          }}>
            {data.crimes.length} {data.crimes.length !== 1 ? "CHARGES" : "CHARGE"}
          </span>
          <span style={{ color: "#555", fontSize: 18, transform: expanded ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>&#9662;</span>
        </div>
      </div>

      {expanded && (
        <div style={{ marginTop: 20, borderTop: "1px solid " + colors.border + "44", paddingTop: 16 }}>
          {data.crimes.map(function(crime, i) {
            return (
              <div key={i} style={{ marginBottom: i < data.crimes.length - 1 ? 16 : 0, paddingLeft: 16, borderLeft: "2px solid " + colors.text + "33" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: colors.text, fontWeight: 700 }}>{crime.year}</span>
                </div>
                <p style={{ margin: "0 0 4px", fontSize: 14, color: "#d4d4d4", lineHeight: 1.5 }}>{crime.charge}</p>
                <p style={{ margin: 0, fontSize: 13, color: "#888", lineHeight: 1.4, fontStyle: "italic" }}>{"-> " + crime.outcome}</p>
                <a
                  href={"https://www.google.com/search?q=" + encodeURIComponent(name + " " + crime.charge + " " + crime.year + " court case")}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={function(e) { e.stopPropagation(); }}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 5, marginTop: 8,
                    fontSize: 11, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600,
                    color: colors.text, textDecoration: "none", letterSpacing: "0.5px",
                    padding: "4px 10px", border: "1px solid " + colors.text + "44", borderRadius: 3,
                    background: colors.text + "0a", transition: "all 0.15s",
                  }}
                  onMouseEnter={function(e) { e.currentTarget.style.background = colors.text + "22"; e.currentTarget.style.borderColor = colors.text + "88"; }}
                  onMouseLeave={function(e) { e.currentTarget.style.background = colors.text + "0a"; e.currentTarget.style.borderColor = colors.text + "44"; }}
                >
                  SEARCH CASE RECORDS
                </a>
              </div>
            );
          })}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 16 }}>
            <a
              href={"https://www.google.com/search?q=" + encodeURIComponent(name + " criminal record court documents")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={function(e) { e.stopPropagation(); }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontSize: 12, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600,
                color: "#e0e0e0", textDecoration: "none", letterSpacing: "0.5px",
                padding: "7px 14px", border: "1px solid #ffffff22", borderRadius: 4,
                background: "#ffffff0a", transition: "all 0.15s",
              }}
              onMouseEnter={function(e) { e.currentTarget.style.background = "#ffffff18"; e.currentTarget.style.borderColor = "#ffffff44"; }}
              onMouseLeave={function(e) { e.currentTarget.style.background = "#ffffff0a"; e.currentTarget.style.borderColor = "#ffffff22"; }}
            >
              COURT RECORDS
            </a>
            <a
              href={"https://news.google.com/search?q=" + encodeURIComponent(name + " arrest charges")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={function(e) { e.stopPropagation(); }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontSize: 12, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600,
                color: "#e0e0e0", textDecoration: "none", letterSpacing: "0.5px",
                padding: "7px 14px", border: "1px solid #ffffff22", borderRadius: 4,
                background: "#ffffff0a", transition: "all 0.15s",
              }}
              onMouseEnter={function(e) { e.currentTarget.style.background = "#ffffff18"; e.currentTarget.style.borderColor = "#ffffff44"; }}
              onMouseLeave={function(e) { e.currentTarget.style.background = "#ffffff0a"; e.currentTarget.style.borderColor = "#ffffff22"; }}
            >
              NEWS COVERAGE
            </a>
          </div>
          {data.status && (
            <div style={{ marginTop: 14, padding: "8px 12px", background: "#ffffff06", borderRadius: 4, fontSize: 12, color: "#999", fontFamily: "'JetBrains Mono', monospace" }}>
              {"STATUS: " + data.status}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ProSportsCrimeTracker() {
  const [query, setQuery] = useState("");
  const [sportFilter, setSportFilter] = useState("ALL");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  var sportSet = new Set(Object.values(CRIME_DATABASE).map(function(d) { return d.sport; }));
  var sports = ["ALL"].concat(Array.from(sportSet).sort());

  var filtered = ALL_NAMES.filter(function(name) {
    var data = CRIME_DATABASE[name];
    var matchesQuery = name.toLowerCase().includes(query.toLowerCase()) || data.team.toLowerCase().includes(query.toLowerCase());
    var matchesSport = sportFilter === "ALL" || data.sport === sportFilter;
    return matchesQuery && matchesSport;
  });

  var suggestions = query.length > 0
    ? ALL_NAMES.filter(function(n) { return n.toLowerCase().includes(query.toLowerCase()); }).slice(0, 6)
    : [];

  useEffect(function() {
    var handler = function(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return function() { document.removeEventListener("mousedown", handler); };
  }, []);

  var totalCrimes = Object.values(CRIME_DATABASE).reduce(function(sum, d) { return sum + d.crimes.length; }, 0);

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#e0e0e0", position: "relative", overflow: "hidden" }}>
      <NoiseOverlay />
      <ScanLine />
      {showDisclaimer && <DisclaimerModal onClose={function() { setShowDisclaimer(false); }} />}
      <style>{
        "@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Barlow:wght@300;400;500;600&display=swap');" +
        "@keyframes fadeSlideIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }" +
        "@keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }" +
        "@keyframes headerGlow { 0%,100% { text-shadow: 0 0 20px #ef444444, 0 0 40px #ef444422; } 50% { text-shadow: 0 0 30px #ef444466, 0 0 60px #ef444433; } }" +
        "* { box-sizing: border-box; }" +
        "input::placeholder { color: #555; }" +
        "::-webkit-scrollbar { width: 6px; }" +
        "::-webkit-scrollbar-track { background: #111; }" +
        "::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }"
      }</style>

      <div style={{ position: "relative", zIndex: 2, maxWidth: 800, margin: "0 auto", padding: "40px 20px 60px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444", animation: "pulse 2s infinite" }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#ef4444", letterSpacing: 3, textTransform: "uppercase", fontWeight: 600 }}>Live Database</span>
          </div>
          <h1 style={{
            fontFamily: "'Oswald', sans-serif", fontSize: "clamp(36px, 7vw, 56px)", fontWeight: 700,
            margin: 0, letterSpacing: 2, textTransform: "uppercase", lineHeight: 1.1,
            background: "linear-gradient(180deg, #ffffff 0%, #ef4444 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            animation: "headerGlow 4s ease-in-out infinite",
          }}>
            Pro Sports<br />Crime Tracker
          </h1>
          <p style={{ fontFamily: "'Barlow', sans-serif", color: "#666", fontSize: 14, marginTop: 12, fontWeight: 300, letterSpacing: 1 }}>
            SEARCHABLE DATABASE OF ATHLETE CRIMINAL RECORDS
          </p>

          <button
            onClick={function() { setShowDisclaimer(true); }}
            style={{
              marginTop: 12, background: "transparent", border: "1px solid #333", borderRadius: 4,
              color: "#666", padding: "5px 14px", cursor: "pointer", fontSize: 11,
              fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1, transition: "all 0.15s",
            }}
            onMouseEnter={function(e) { e.currentTarget.style.borderColor = "#ef4444"; e.currentTarget.style.color = "#ef4444"; }}
            onMouseLeave={function(e) { e.currentTarget.style.borderColor = "#333"; e.currentTarget.style.color = "#666"; }}
          >
            LEGAL DISCLAIMER
          </button>

          <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 20 }}>
            <div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 28, fontWeight: 700, color: "#ef4444" }}>{ALL_NAMES.length}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#555", letterSpacing: 2 }}>ATHLETES</div>
            </div>
            <div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 28, fontWeight: 700, color: "#ef4444" }}>{totalCrimes}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#555", letterSpacing: 2 }}>CHARGES</div>
            </div>
            <div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 28, fontWeight: 700, color: "#ef4444" }}>{sports.length - 1}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#555", letterSpacing: 2 }}>SPORTS</div>
            </div>
          </div>
        </div>

        <div ref={containerRef} style={{ position: "relative", marginBottom: 20 }}>
          <div style={{
            display: "flex", alignItems: "center", background: "#111", border: "1px solid #2a2a2a",
            borderRadius: 6, padding: "0 16px", transition: "border-color 0.2s",
          }}>
            <span style={{ color: "#ef4444", fontSize: 18, marginRight: 12 }}>&#9740;</span>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={function(e) { setQuery(e.target.value); setShowSuggestions(true); }}
              onFocus={function() { setShowSuggestions(true); }}
              placeholder="Search athlete name or team..."
              style={{
                flex: 1, background: "transparent", border: "none", outline: "none", color: "#e0e0e0",
                fontFamily: "'Barlow', sans-serif", fontSize: 16, padding: "14px 0", fontWeight: 400,
              }}
            />
            {query && (
              <span onClick={function() { setQuery(""); inputRef.current.focus(); }}
                style={{ color: "#555", cursor: "pointer", fontSize: 14, padding: 4 }}>X</span>
            )}
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <div style={{
              position: "absolute", top: "100%", left: 0, right: 0, zIndex: 10,
              background: "#151515", border: "1px solid #2a2a2a", borderTop: "none",
              borderRadius: "0 0 6px 6px", overflow: "hidden",
            }}>
              {suggestions.map(function(sName) {
                var d = CRIME_DATABASE[sName];
                var c = getColor(d.sport);
                return (
                  <div key={sName}
                    onClick={function() { setQuery(sName); setShowSuggestions(false); }}
                    style={{ padding: "10px 16px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "background 0.15s" }}
                    onMouseEnter={function(e) { e.currentTarget.style.background = "#1a1a1a"; }}
                    onMouseLeave={function(e) { e.currentTarget.style.background = "transparent"; }}
                  >
                    <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "#ccc" }}>{sName}</span>
                    <span style={{ fontSize: 10, color: c.text, fontFamily: "'JetBrains Mono', monospace", background: c.badge, padding: "1px 6px", borderRadius: 2 }}>{d.sport}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 28 }}>
          {sports.map(function(sport) {
            var active = sportFilter === sport;
            var c = sport === "ALL" ? { text: "#ef4444", badge: "#1c1917", border: "#333" } : getColor(sport);
            return (
              <button key={sport} onClick={function() { setSportFilter(sport); }}
                style={{
                  background: active ? (sport === "ALL" ? "#ef4444" : c.badge) : "transparent",
                  color: active ? "#fff" : "#666",
                  border: "1px solid " + (active ? (sport === "ALL" ? "#ef4444" : c.text) : "#222"),
                  borderRadius: 4, padding: "5px 12px", cursor: "pointer",
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600,
                  letterSpacing: "0.5px", textTransform: "uppercase", transition: "all 0.15s",
                }}
              >
                {sport}
              </button>
            );
          })}
        </div>

        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#444", marginBottom: 16, letterSpacing: 1 }}>
          {filtered.length + " RESULT" + (filtered.length !== 1 ? "S" : "") + (query ? (" FOR \"" + query.toUpperCase() + "\"") : "")}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: 60, color: "#333" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>&#8856;</div>
              <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 16 }}>No records found</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, marginTop: 8, color: "#444" }}>Try a different search or filter</div>
            </div>
          ) : (
            filtered.map(function(aName, i) {
              return (
                <div key={aName} style={{ animationDelay: (i * 0.05) + "s" }}>
                  <AthleteCard name={aName} data={CRIME_DATABASE[aName]} />
                </div>
              );
            })
          )}
        </div>

        <div style={{ textAlign: "center", marginTop: 48, padding: "20px 0", borderTop: "1px solid #1a1a1a" }}>
          <button
            onClick={function() { setShowDisclaimer(true); }}
            style={{
              background: "transparent", border: "none", color: "#444", cursor: "pointer",
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 1,
              textDecoration: "underline", marginBottom: 12, display: "block", margin: "0 auto 12px",
            }}
          >
            Legal Disclaimer
          </button>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#333", letterSpacing: 1, margin: 0 }}>
            ALL INFORMATION IS SOURCED FROM PUBLIC RECORDS AND NEWS REPORTS.<br />
            INCLUSION DOES NOT IMPLY GUILT WHERE ACQUITTALS OR DISMISSALS OCCURRED.<br />
            THIS SITE IS NOT AFFILIATED WITH ANY SPORTS LEAGUE, TEAM, OR PLAYER ASSOCIATION.
          </p>
        </div>
      </div>
    </div>
  );
}

