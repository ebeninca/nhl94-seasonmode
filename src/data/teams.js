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

export function abbr(team) { return teamAbbr[team] || team; }
