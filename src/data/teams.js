export const teams = {
    'Boston Bruins': { conference: 'Eastern', division: 'Northeast', rating: 76 },
    'Buffalo Sabres': { conference: 'Eastern', division: 'Northeast', rating: 73 },
    'Hartford Whalers': { conference: 'Eastern', division: 'Northeast', rating: 66 },
    'Montreal Canadiens': { conference: 'Eastern', division: 'Northeast', rating: 73 },
    'Ottawa Senators': { conference: 'Eastern', division: 'Northeast', rating: 55 },
    'Pittsburgh Penguins': { conference: 'Eastern', division: 'Northeast', rating: 75 },
    'Quebec Nordiques': { conference: 'Eastern', division: 'Northeast', rating: 71 },

    'New Jersey Devils': { conference: 'Eastern', division: 'Atlantic', rating: 68 },
    'New York Islanders': { conference: 'Eastern', division: 'Atlantic', rating: 66 },
    'New York Rangers': { conference: 'Eastern', division: 'Atlantic', rating: 74 },
    'Philadelphia Flyers': { conference: 'Eastern', division: 'Atlantic', rating: 69 },
    'Florida Panthers': { conference: 'Eastern', division: 'Atlantic', rating: 52 },
    'Tampa Bay Lightning': { conference: 'Eastern', division: 'Atlantic', rating: 56 },
    'Washington Capitals': { conference: 'Eastern', division: 'Atlantic', rating: 70 },

    'Chicago Blackhawks': { conference: 'Western', division: 'Central', rating: 78 },
    'Dallas Stars': { conference: 'Western', division: 'Central', rating: 67 },
    'Detroit Red Wings': { conference: 'Western', division: 'Central', rating: 75 },
    'St. Louis Blues': { conference: 'Western', division: 'Central', rating: 69 },
    'Toronto Maple Leafs': { conference: 'Western', division: 'Central', rating: 72 },
    'Winnipeg Jets': { conference: 'Western', division: 'Central', rating: 72 },

    'Calgary Flames': { conference: 'Western', division: 'Pacific', rating: 75 },
    'Edmonton Oilers': { conference: 'Western', division: 'Pacific', rating: 67 },
    'Los Angeles Kings': { conference: 'Western', division: 'Pacific', rating: 74 },
    'Mighty Ducks of Anaheim': { conference: 'Western', division: 'Pacific', rating: 51 },
    'San Jose Sharks': { conference: 'Western', division: 'Pacific', rating: 56 },
    'Vancouver Canucks': { conference: 'Western', division: 'Pacific', rating: 71 }
};

export const teamAbbr = {
    'Boston Bruins': 'BOS', 'Buffalo Sabres': 'BUF', 'Hartford Whalers': 'HFD',
    'Montreal Canadiens': 'MTL', 'Ottawa Senators': 'OTT', 'Pittsburgh Penguins': 'PIT',
    'Quebec Nordiques': 'QUE', 'New Jersey Devils': 'NJD', 'New York Islanders': 'NYI',
    'New York Rangers': 'NYR', 'Philadelphia Flyers': 'PHI', 'Florida Panthers': 'FLA',
    'Tampa Bay Lightning': 'TBL', 'Washington Capitals': 'WSH', 'Chicago Blackhawks': 'CHI',
    'Dallas Stars': 'DAL', 'Detroit Red Wings': 'DET', 'St. Louis Blues': 'STL',
    'Toronto Maple Leafs': 'TOR', 'Winnipeg Jets': 'WPG', 'Calgary Flames': 'CGY',
    'Edmonton Oilers': 'EDM', 'Los Angeles Kings': 'LAK', 'Mighty Ducks of Anaheim': 'ANA',
    'San Jose Sharks': 'SJS', 'Vancouver Canucks': 'VAN'
};

export const teamColors = {
    'Boston Bruins': ['#000000', '#FFB81C'],
    'Buffalo Sabres': ['#002654', '#FFB81C'],
    'Hartford Whalers': ['#00703C', '#002868'],
    'Montreal Canadiens': ['#AF1E2D', '#192168'],
    'Ottawa Senators': ['#000000', '#C52032'],
    'Pittsburgh Penguins': ['#000000', '#FCB514'],
    'Quebec Nordiques': ['#002868', '#C8102E'],
    'New Jersey Devils': ['#CE1126', '#000000'],
    'New York Islanders': ['#003087', '#FC4C02'],
    'New York Rangers': ['#0038A8', '#CE1126'],
    'Philadelphia Flyers': ['#F74902', '#000000'],
    'Florida Panthers': ['#041E42', '#C8102E'],
    'Tampa Bay Lightning': ['#002868', '#000000'],
    'Washington Capitals': ['#002868', '#C8102E'],
    'Chicago Blackhawks': ['#CF0A2C', '#000000'],
    'Dallas Stars': ['#006847', '#000000'],
    'Detroit Red Wings': ['#CE1126', '#cac9c9'],
    'St. Louis Blues': ['#002F87', '#FCB514'],
    'Toronto Maple Leafs': ['#003E7E', '#cac9c9'],
    'Winnipeg Jets': ['#002868', '#C8102E'],
    'Calgary Flames': ['#CE1126', '#F1BE48'],
    'Edmonton Oilers': ['#07255c', '#FF4C00'],
    'Los Angeles Kings': ['#111111', '#A2AAAD'],
    'Mighty Ducks of Anaheim': ['#6F2DA8', '#007A5E'],
    'San Jose Sharks': ['#006D75', '#000000'],
    'Vancouver Canucks': ['#002244', '#FFB81C']
};

export function teamNameHtml(team) {
    const colors = teamColors[team];
    if (!colors) return team;
    return `<span style="background:linear-gradient(135deg, ${colors[0]}, ${colors[1]}); color:white; padding:2px 6px; border-radius:3px; font-weight:bold;">${team}</span>`;
}

export function abbr(team) { return teamAbbr[team] || team; }
