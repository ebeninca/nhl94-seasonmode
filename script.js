// NHL teams with their divisions, conferences, and NHL 94 Genesis ratings
const teams = {
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

const players = {
    'Mighty Ducks of Anaheim': {
        forwards: [
            {name: 'Terry Yake', rating: 66}, {name: 'Anatoli Semenov', rating: 61},
            {name: 'Lonnie Loach', rating: 49}, {name: 'Troy Loney', rating: 49},
            {name: 'Steven King', rating: 47}, {name: 'Bob Corkum', rating: 45},
            {name: 'Tim Sweeney', rating: 45}, {name: 'Robin Bawa', rating: 42},
            {name: 'Stu Grimson', rating: 37}
        ],
        defensemen: [
            {name: 'Alexei Kasatonov', rating: 62}, {name: 'Bill Houlder', rating: 50},
            {name: 'Randy Ladouceur', rating: 46}, {name: 'Sean Hill', rating: 45},
            {name: 'David Williams', rating: 43}, {name: 'Dennis Vial', rating: 38},
            {name: 'Bobby Dollas', rating: 38}
        ],
        goalies: [
            {name: 'Guy Hebert', rating: 45}, {name: 'Ron Tugnutt', rating: 41}
        ]
    },
    'Boston Bruins': {
        forwards: [
            {name: 'Adam Oates', rating: 93}, {name: 'Cam Neely', rating: 86},
            {name: 'Joe Juneau', rating: 72}, {name: 'Dmitri Kvartalnov', rating: 69},
            {name: 'Dave Poulin', rating: 68}, {name: 'Vladimir Ruzicka', rating: 67},
            {name: 'Ted Donato', rating: 65}, {name: 'Steve Heinze', rating: 60},
            {name: 'Peter Douris', rating: 59}, {name: 'Stephen Leach', rating: 59},
            {name: 'Grigori Panteleev', rating: 54}, {name: 'Dave Reid', rating: 53},
            {name: 'C.J. Young', rating: 51}, {name: 'Brent Hughes', rating: 50},
            {name: 'Darin Kimble', rating: 42}
        ],
        defensemen: [
            {name: 'Ray Bourque', rating: 99}, {name: 'Glen Wesley', rating: 71},
            {name: 'Don Sweeney', rating: 71}, {name: 'Gord Murphy', rating: 63},
            {name: 'Glen Featherstone', rating: 51}, {name: 'Gordie Roberts', rating: 49},
            {name: 'David Shaw', rating: 49}, {name: 'Jim Wiemer', rating: 41}
        ],
        goalies: [
            {name: 'John Blue', rating: 62}, {name: 'Andy Moog', rating: 59}
        ]
    },
    'Buffalo Sabres': {
        forwards: [
            {name: 'Alexander Mogilny', rating: 96}, {name: 'Pat LaFontaine', rating: 91},
            {name: 'Dale Hawerchuk', rating: 74}, {name: 'Bob Sweeney', rating: 68},
            {name: 'Yuri Khmylev', rating: 67}, {name: 'Bob Errey', rating: 63},
            {name: 'Donald Audette', rating: 57}, {name: 'Colin Patterson', rating: 55},
            {name: 'Wayne Presley', rating: 55}, {name: 'Randy Wood', rating: 55},
            {name: 'Dave Hannan', rating: 47}, {name: 'Brad May', rating: 47},
            {name: 'Rob Ray', rating: 46}, {name: 'Bob Corkum', rating: 45}
        ],
        defensemen: [
            {name: 'Petr Svoboda', rating: 65}, {name: 'Richard Smehlik', rating: 60},
            {name: 'Doug Bodger', rating: 53}, {name: 'Grant Ledyard', rating: 47},
            {name: 'Ken Sutton', rating: 46}, {name: 'Keith Carney', rating: 46},
            {name: 'Randy Moller', rating: 45}, {name: 'Gord Donnelly', rating: 43}
        ],
        goalies: [
            {name: 'Grant Fuhr', rating: 84}, {name: 'Dominik Hasek', rating: 52},
            {name: 'Tom Draper', rating: 45}
        ]
    },
    'Calgary Flames': {
        forwards: [
            {name: 'Theoren Fleury', rating: 86}, {name: 'Gary Roberts', rating: 85},
            {name: 'Joe Nieuwendyk', rating: 74}, {name: 'Robert Reichel', rating: 73},
            {name: 'Sergei Makarov', rating: 73}, {name: 'Joel Otto', rating: 71},
            {name: 'Paul Ranheim', rating: 66}, {name: 'Brent Ashton', rating: 63},
            {name: 'Brian Skrudland', rating: 60}, {name: 'Chris Lindberg', rating: 55},
            {name: 'Greg Paslawski', rating: 50}, {name: 'Ronnie Stern', rating: 46},
            {name: 'Craig Berube', rating: 41}
        ],
        defensemen: [
            {name: 'Gary Suter', rating: 81}, {name: 'Al MacInnis', rating: 73},
            {name: 'Michel Petit', rating: 57}, {name: 'Frank Musil', rating: 53},
            {name: 'Kevin Dahl', rating: 52}, {name: 'Roger Johansson', rating: 51},
            {name: 'Chris Dahlquist', rating: 51}, {name: 'Trent Yawney', rating: 50},
            {name: 'Alexander Godynyuk', rating: 48}, {name: 'Greg Smyth', rating: 29}
        ],
        goalies: [
            {name: 'Mike Vernon', rating: 63}, {name: 'Jeff Reese', rating: 48}
        ]
    },
    'Chicago Blackhawks': {
        forwards: [
            {name: 'Jeremy Roenick', rating: 89}, {name: 'Steve Larmer', rating: 86},
            {name: 'Christian Ruuttu', rating: 72}, {name: 'Brent Sutter', rating: 71},
            {name: 'Joe Murphy', rating: 71}, {name: 'Dirk Graham', rating: 67},
            {name: 'Brian Noonan', rating: 65}, {name: 'Michel Goulet', rating: 61},
            {name: 'Troy Murray', rating: 58}, {name: 'Greg Gilbert', rating: 54},
            {name: 'Jocelyn Lemieux', rating: 54}, {name: 'Rob Brown', rating: 54},
            {name: 'Dave Christian', rating: 51}, {name: 'Stephane Matteau', rating: 48},
            {name: 'Stu Grimson', rating: 37}
        ],
        defensemen: [
            {name: 'Chris Chelios', rating: 84}, {name: 'Steve Smith', rating: 72},
            {name: 'Bryan Marchment', rating: 51}, {name: 'Keith Brown', rating: 49},
            {name: 'Cam Russell', rating: 49}, {name: 'Craig Muni', rating: 46},
            {name: 'Frantisek Kucera', rating: 46}, {name: 'Adam Bennett', rating: 39}
        ],
        goalies: [
            {name: 'Ed Belfour', rating: 98}, {name: 'Jim Waite', rating: 48}
        ]
    },
    'Dallas Stars': {
        forwards: [
            {name: 'Mike Modano', rating: 82}, {name: 'Dave Gagner', rating: 75},
            {name: 'Russ Courtnall', rating: 73}, {name: 'Ulf Dahlen', rating: 70},
            {name: 'Neal Broten', rating: 69}, {name: 'Mike Craig', rating: 62},
            {name: 'Mike McPhee', rating: 59}, {name: 'Brian Propp', rating: 55},
            {name: 'Brent Gilchrist', rating: 55}, {name: 'Gaetan Duchesne', rating: 54},
            {name: 'Bobby Smith', rating: 53}, {name: 'Stewart Gavin', rating: 47},
            {name: 'Shane Churla', rating: 44}, {name: 'Trent Klatt', rating: 43}
        ],
        defensemen: [
            {name: 'Mark Tinordi', rating: 65}, {name: 'Tommy Sjodin', rating: 57},
            {name: 'Jim Johnson', rating: 54}, {name: 'Richard Matvichuk', rating: 48},
            {name: 'Derian Hatcher', rating: 47}, {name: 'Craig Ludwig', rating: 44},
            {name: 'Brad Berry', rating: 42}, {name: 'Mark Osiecki', rating: 41},
            {name: 'Enrico Ciccone', rating: 38}
        ],
        goalies: [
            {name: 'Jon Casey', rating: 60}, {name: 'Darcy Wakaluk', rating: 47}
        ]
    },
    'Detroit Red Wings': {
        forwards: [
            {name: 'Steve Yzerman', rating: 95}, {name: 'Sergei Fedorov', rating: 84},
            {name: 'Dino Ciccarelli', rating: 80}, {name: 'Paul Ysebaert', rating: 74},
            {name: 'Dallas Drake', rating: 66}, {name: 'John Ogrodnick', rating: 61},
            {name: 'Bob Probert', rating: 60}, {name: 'Ray Sheppard', rating: 59},
            {name: 'Gerard Gallant', rating: 57}, {name: 'Keith Primeau', rating: 56},
            {name: 'Mike Sillinger', rating: 55}, {name: 'Vyacheslav Kozlov', rating: 53},
            {name: 'Sheldon Kennedy', rating: 52}, {name: 'Shawn Burr', rating: 50},
            {name: 'Jim Hiller', rating: 45}
        ],
        defensemen: [
            {name: 'Paul Coffey', rating: 83}, {name: 'Steve Chiasson', rating: 68},
            {name: 'Nicklas Lidstrom', rating: 66}, {name: 'Yves Racine', rating: 60},
            {name: 'Vladimir Konstantinov', rating: 58}, {name: 'Mark Howe', rating: 58},
            {name: 'Steve Konroyd', rating: 51}, {name: 'Brad McCrimmon', rating: 48}
        ],
        goalies: [
            {name: 'Tim Cheveldae', rating: 69}, {name: 'Vincent Riendeau', rating: 46}
        ]
    },
    'Edmonton Oilers': {
        forwards: [
            {name: 'Petr Klima', rating: 76}, {name: 'Shayne Corson', rating: 71},
            {name: 'Craig Simpson', rating: 69}, {name: 'Doug Weight', rating: 65},
            {name: 'Craig MacTavish', rating: 61}, {name: 'Kevin Todd', rating: 61},
            {name: 'Zdeno Ciger', rating: 60}, {name: 'Todd Elik', rating: 59},
            {name: 'Mike Hudson', rating: 51}, {name: 'Martin Gelinas', rating: 50},
            {name: 'Scott Mellanby', rating: 49}, {name: 'Kelly Buchberger', rating: 48},
            {name: 'Shjon Podein', rating: 48}, {name: 'Steven Rice', rating: 42},
            {name: 'Louie DeBrusk', rating: 42}
        ],
        defensemen: [
            {name: 'Dave Manson', rating: 74}, {name: 'Igor Kravchuk', rating: 66},
            {name: 'Brian Benning', rating: 53}, {name: 'Brad Werenka', rating: 51},
            {name: 'Brian Glynn', rating: 51}, {name: 'Chris Joseph', rating: 50},
            {name: 'Geoff Smith', rating: 50}, {name: 'Luke Richardson', rating: 49}
        ],
        goalies: [
            {name: 'Bill Ranford', rating: 66}, {name: 'Ron Tugnutt', rating: 41}
        ]
    },
    'Florida Panthers': {
        forwards: [
            {name: 'Brian Skrudland', rating: 60}, {name: 'Andrei Lomakin', rating: 57},
            {name: 'Mike Hough', rating: 53}, {name: 'Scott Mellanby', rating: 49},
            {name: 'Dave Lowry', rating: 48}, {name: 'Tom Fitzgerald', rating: 47},
            {name: 'Randy Gilhen', rating: 45}, {name: 'Bill Lindsay', rating: 44},
            {name: 'Jesse Belanger', rating: 44}
        ],
        defensemen: [
            {name: 'Gord Murphy', rating: 63}, {name: 'Stephane Richer', rating: 57},
            {name: 'Joe Cirella', rating: 49}, {name: 'Alexander Godynyuk', rating: 48},
            {name: 'Gord Hynes', rating: 46}, {name: 'Milan Tichy', rating: 44}
        ],
        goalies: [
            {name: 'John Vanbiesbrouck', rating: 62}, {name: 'Mark Fitzpatrick', rating: 45}
        ]
    },
    'Hartford Whalers': {
        forwards: [
            {name: 'Pat Verbeek', rating: 74}, {name: 'Geoff Sanderson', rating: 73},
            {name: 'Terry Yake', rating: 66}, {name: 'Andrew Cassels', rating: 65},
            {name: 'Mark Janssens', rating: 62}, {name: 'Robert Kron', rating: 59},
            {name: 'Patrick Poulin', rating: 58}, {name: 'Michael Nylander', rating: 56},
            {name: 'Robert Petrovicky', rating: 51}, {name: 'Randy Cunneyworth', rating: 50},
            {name: 'Nick Kypreos', rating: 48}, {name: 'Jamie Leach', rating: 48},
            {name: 'Yvon Corriveau', rating: 46}, {name: 'Jim McKenzie', rating: 42},
            {name: 'Mark Greig', rating: 36}
        ],
        defensemen: [
            {name: 'Zarley Zalapski', rating: 80}, {name: 'Eric Weinrich', rating: 64},
            {name: 'Adam Burt', rating: 60}, {name: 'Randy Ladouceur', rating: 46},
            {name: 'Allen Pedersen', rating: 46}, {name: 'Dan Keczmer', rating: 44},
            {name: 'Doug Houda', rating: 42}
        ],
        goalies: [
            {name: 'Sean Burke', rating: 61}, {name: 'Mario Gosselin', rating: 46},
            {name: 'Frank Pietrangelo', rating: 44}
        ]
    },
    'Los Angeles Kings': {
        forwards: [
            {name: 'Wayne Gretzky', rating: 87}, {name: 'Luc Robitaille', rating: 85},
            {name: 'Tomas Sandstrom', rating: 80}, {name: 'Jimmy Carson', rating: 76},
            {name: 'Tony Granato', rating: 75}, {name: 'Jari Kurri', rating: 70},
            {name: 'Mike Donnelly', rating: 65}, {name: 'Corey Millen', rating: 63},
            {name: 'Dave Taylor', rating: 51}, {name: 'Lonnie Loach', rating: 49},
            {name: 'Pat Conacher', rating: 47}, {name: 'Warren Rychel', rating: 42},
            {name: 'Gary Shuchuk', rating: 42}
        ],
        defensemen: [
            {name: 'Rob Blake', rating: 72}, {name: 'Alexei Zhitnik', rating: 66},
            {name: 'Marty McSorley', rating: 61}, {name: 'Darryl Sydor', rating: 53},
            {name: 'Charlie Huddy', rating: 52}, {name: 'Mark Hardy', rating: 47},
            {name: 'Brent Thompson', rating: 41}, {name: 'Tim Watters', rating: 41},
            {name: 'Rene Chapdelaine', rating: 32}
        ],
        goalies: [
            {name: 'Kelly Hrudey', rating: 58}, {name: 'Robb Stauber', rating: 52},
            {name: 'Rick Knickle', rating: 44}
        ]
    },
    'Montreal Canadiens': {
        forwards: [
            {name: 'Kirk Muller', rating: 80}, {name: 'Denis Savard', rating: 75},
            {name: 'Stephan Lebeau', rating: 74}, {name: 'Brian Bellows', rating: 74},
            {name: 'Vincent Damphousse', rating: 74}, {name: 'Mike Keane', rating: 62},
            {name: 'John LeClair', rating: 62}, {name: 'Guy Carbonneau', rating: 62},
            {name: 'Gary Leeman', rating: 61}, {name: 'Gilbert Dionne', rating: 61},
            {name: 'Benoit Brunet', rating: 48}, {name: 'Ed Ronan', rating: 45},
            {name: 'Mario Roberge', rating: 40}, {name: 'Todd Ewen', rating: 40}
        ],
        defensemen: [
            {name: 'Eric Desjardins', rating: 68}, {name: 'Mathieu Schneider', rating: 66},
            {name: 'J.J. Daigneault', rating: 60}, {name: 'Patrice Brisebois', rating: 55},
            {name: 'Rob Ramage', rating: 52}, {name: 'Lyle Odelein', rating: 48},
            {name: 'Kevin Haller', rating: 45}, {name: 'Sean Hill', rating: 45},
            {name: 'Donald Dufresne', rating: 43}
        ],
        goalies: [
            {name: 'Patrick Roy', rating: 94}, {name: 'Andre Racicot', rating: 47}
        ]
    },
    'New Jersey Devils': {
        forwards: [
            {name: 'Alexander Semak', rating: 73}, {name: 'Stephane Richer', rating: 72},
            {name: 'Peter Stastny', rating: 70}, {name: 'Valeri Zelepukin', rating: 68},
            {name: 'Claude Lemieux', rating: 68}, {name: 'Bobby Holik', rating: 64},
            {name: 'John MacLean', rating: 63}, {name: 'Bernie Nicholls', rating: 61},
            {name: 'Dave Barr', rating: 53}, {name: 'Bill Guerin', rating: 50},
            {name: 'Scott Pellerin', rating: 50}, {name: 'Tom Chorske', rating: 48},
            {name: 'Janne Ojanen', rating: 47}, {name: 'Randy McKay', rating: 46},
            {name: 'Troy Mallette', rating: 45}
        ],
        defensemen: [
            {name: 'Scott Stevens', rating: 76}, {name: 'Alexei Kasatonov', rating: 62},
            {name: 'Viacheslav Fetisov', rating: 61}, {name: 'Bruce Driver', rating: 60},
            {name: 'Scott Niedermayer', rating: 58}, {name: 'Tommy Albelin', rating: 47},
            {name: 'Ken Daneyko', rating: 46}, {name: 'Myles O\'Connor', rating: 32}
        ],
        goalies: [
            {name: 'Chris Terreri', rating: 61}, {name: 'Craig Billington', rating: 42}
        ]
    },
    'New York Islanders': {
        forwards: [
            {name: 'Pierre Turgeon', rating: 82}, {name: 'Benoit Hogue', rating: 78},
            {name: 'Steve Thomas', rating: 72}, {name: 'Derek King', rating: 64},
            {name: 'Ray Ferraro', rating: 63}, {name: 'Patrick Flatley', rating: 62},
            {name: 'Dave Volek', rating: 60}, {name: 'Brian Mullen', rating: 59},
            {name: 'Marty McInnis', rating: 54}, {name: 'Claude Loiselle', rating: 48},
            {name: 'Tom Fitzgerald', rating: 47}, {name: 'Dan Marois', rating: 47},
            {name: 'Travis Green', rating: 47}, {name: 'Brad Dalgarno', rating: 46},
            {name: 'Mick Vukota', rating: 40}
        ],
        defensemen: [
            {name: 'Vladimir Malakhov', rating: 63}, {name: 'Tom Kurvers', rating: 59},
            {name: 'Darius Kasparaitis', rating: 57}, {name: 'Jeff Norton', rating: 56},
            {name: 'Uwe Krupp', rating: 53}, {name: 'Scott Lachance', rating: 53},
            {name: 'Richard Pilon', rating: 46}, {name: 'Dennis Vaske', rating: 38}
        ],
        goalies: [
            {name: 'Glenn Healy', rating: 47}, {name: 'Mark Fitzpatrick', rating: 45}
        ]
    },
    'New York Rangers': {
        forwards: [
            {name: 'Mark Messier', rating: 85}, {name: 'Mike Gartner', rating: 85},
            {name: 'Esa Tikkanen', rating: 80}, {name: 'Sergei Nemchinov', rating: 72},
            {name: 'Darren Turcotte', rating: 70}, {name: 'Adam Graves', rating: 68},
            {name: 'Ed Olczyk', rating: 65}, {name: 'Tony Amonte', rating: 65},
            {name: 'Alexei Kovalev', rating: 60}, {name: 'Phil Bourque', rating: 56},
            {name: 'Jan Erixon', rating: 54}, {name: 'Steven King', rating: 47},
            {name: 'Joey Kocur', rating: 43}, {name: 'Paul Broten', rating: 41},
            {name: 'Mike Hartman', rating: 40}
        ],
        defensemen: [
            {name: 'Brian Leetch', rating: 76}, {name: 'James Patrick', rating: 71},
            {name: 'Kevin Lowe', rating: 62}, {name: 'Sergei Zubov', rating: 60},
            {name: 'Peter Andersson', rating: 49}, {name: 'Joe Cirella', rating: 49},
            {name: 'Jeff Beukeboom', rating: 47}, {name: 'Jay Wells', rating: 44}
        ],
        goalies: [
            {name: 'John Vanbiesbrouck', rating: 62}, {name: 'Mike Richter', rating: 60}
        ]
    },
    'Ottawa Senators': {
        forwards: [
            {name: 'Bob Kudelski', rating: 60}, {name: 'Sylvain Turgeon', rating: 60},
            {name: 'Jamie Baker', rating: 59}, {name: 'Mark Lamb', rating: 56},
            {name: 'Laurie Boschman', rating: 54}, {name: 'Mark Freer', rating: 50},
            {name: 'Jeff Lazaro', rating: 50}, {name: 'Neil Brady', rating: 49},
            {name: 'Jody Hull', rating: 49}, {name: 'Andrew McBain', rating: 49},
            {name: 'Doug Smail', rating: 48}, {name: 'Mike Peluso', rating: 47},
            {name: 'David Archibald', rating: 46}, {name: 'Rob Murphy', rating: 44},
            {name: 'Darcy Loewen', rating: 41}
        ],
        defensemen: [
            {name: 'Norm Maciver', rating: 61}, {name: 'Brad Shaw', rating: 51},
            {name: 'Darren Rumble', rating: 46}, {name: 'Ken Hammond', rating: 46},
            {name: 'Tomas Jelinek', rating: 45}, {name: 'Chris Luongo', rating: 41},
            {name: 'Brad Marsh', rating: 40}, {name: 'Gord Dineen', rating: 39}
        ],
        goalies: [
            {name: 'Daniel Berthiaume', rating: 42}, {name: 'Peter Sidorkiewicz', rating: 40}
        ]
    },
    'Philadelphia Flyers': {
        forwards: [
            {name: 'Eric Lindros', rating: 84}, {name: 'Mark Recchi', rating: 83},
            {name: 'Pelle Eklund', rating: 75}, {name: 'Rod Brind\'Amour', rating: 75},
            {name: 'Kevin Dineen', rating: 68}, {name: 'Andrei Lomakin', rating: 57},
            {name: 'Keith Acton', rating: 55}, {name: 'Josef Beranek', rating: 55},
            {name: 'Brent Fedyk', rating: 54}, {name: 'Dave Snuggerud', rating: 49},
            {name: 'Doug Evans', rating: 46}, {name: 'Viacheslav Butsayev', rating: 43},
            {name: 'Claude Boivin', rating: 41}, {name: 'Dave Brown', rating: 35}
        ],
        defensemen: [
            {name: 'Dmitry Yushkevich', rating: 59}, {name: 'Greg Hawgood', rating: 58},
            {name: 'Garry Galley', rating: 52}, {name: 'Ric Nattress', rating: 49},
            {name: 'Terry Carkner', rating: 47}, {name: 'Gord Hynes', rating: 46},
            {name: 'Ryan McGill', rating: 45}, {name: 'Shawn Cronin', rating: 38}
        ],
        goalies: [
            {name: 'Tommy Soderstrom', rating: 72}, {name: 'Dominic Roussel', rating: 50},
            {name: 'Stephane Beauregard', rating: 36}
        ]
    },
    'Pittsburgh Penguins': {
        forwards: [
            {name: 'Mario Lemieux', rating: 100}, {name: 'Jaromir Jagr', rating: 80},
            {name: 'Kevin Stevens', rating: 77}, {name: 'Ron Francis', rating: 75},
            {name: 'Joe Mullen', rating: 73}, {name: 'Rick Tocchet', rating: 69},
            {name: 'Shawn McEachern', rating: 59}, {name: 'Martin Straka', rating: 50},
            {name: 'Troy Loney', rating: 49}, {name: 'Dave Tippett', rating: 48},
            {name: 'Mike Stapleton', rating: 46}, {name: 'Mike Needham', rating: 46},
            {name: 'Jeff Daniels', rating: 45}, {name: 'Jay Caufield', rating: 36}
        ],
        defensemen: [
            {name: 'Larry Murphy', rating: 74}, {name: 'Ulf Samuelsson', rating: 68},
            {name: 'Paul Stanton', rating: 52}, {name: 'Kjell Samuelsson', rating: 49},
            {name: 'Peter Taglianetti', rating: 49}, {name: 'Mike Ramsey', rating: 49},
            {name: 'Jim Paek', rating: 46}, {name: 'Grant Jennings', rating: 43},
            {name: 'Bryan Fogarty', rating: 38}
        ],
        goalies: [
            {name: 'Tom Barrasso', rating: 74}, {name: 'Ken Wregget', rating: 48}
        ]
    },
    'Quebec Nordiques': {
        forwards: [
            {name: 'Joe Sakic', rating: 83}, {name: 'Mats Sundin', rating: 79},
            {name: 'Valeri Kamensky', rating: 73}, {name: 'Mike Ricci', rating: 73},
            {name: 'Owen Nolan', rating: 71}, {name: 'Andrei Kovalenko', rating: 69},
            {name: 'Scott Young', rating: 60}, {name: 'Claude Lapointe', rating: 56},
            {name: 'Mike Hough', rating: 53}, {name: 'Martin Rucinsky', rating: 51},
            {name: 'Scott Pearson', rating: 49}, {name: 'Gino Cavallini', rating: 47},
            {name: 'Bill Lindsay', rating: 44}, {name: 'Chris Simon', rating: 35},
            {name: 'Tony Twist', rating: 33}
        ],
        defensemen: [
            {name: 'Steve Duchesne', rating: 72}, {name: 'Curtis Leschyshyn', rating: 62},
            {name: 'Alexei Gusarov', rating: 61}, {name: 'Mikhail Tatarinov', rating: 58},
            {name: 'Kerry Huffman', rating: 55}, {name: 'Steve Finn', rating: 48},
            {name: 'Adam Foote', rating: 47}, {name: 'Craig Wolanin', rating: 42}
        ],
        goalies: [
            {name: 'Ron Hextall', rating: 68}, {name: 'Stephane Fiset', rating: 47}
        ]
    },
    'San Jose Sharks': {
        forwards: [
            {name: 'Kelly Kisio', rating: 63}, {name: 'Pat Falloon', rating: 61},
            {name: 'Rob Gaudreau', rating: 56}, {name: 'Johan Garpenlov', rating: 55},
            {name: 'Perry Berezan', rating: 53}, {name: 'Mark Pederson', rating: 48},
            {name: 'Jeff Odgers', rating: 47}, {name: 'Mike Sullivan', rating: 47},
            {name: 'Dean Evason', rating: 46}, {name: 'Ed Courtenay', rating: 46},
            {name: 'John Carter', rating: 44}, {name: 'Robin Bawa', rating: 42},
            {name: 'David Maley', rating: 38}
        ],
        defensemen: [
            {name: 'Doug Wilson', rating: 65}, {name: 'Sandis Ozolinsh', rating: 59},
            {name: 'Neil Wilkinson', rating: 50}, {name: 'Jay More', rating: 49},
            {name: 'Doug Zmolek', rating: 47}, {name: 'Tom Pederson', rating: 46},
            {name: 'Rob Zettler', rating: 45}, {name: 'Peter Ahola', rating: 45},
            {name: 'David Williams', rating: 43}
        ],
        goalies: [
            {name: 'Arturs Irbe', rating: 50}, {name: 'Jeff Hackett', rating: 40},
            {name: 'Brian Hayward', rating: 38}
        ]
    },
    'St. Louis Blues': {
        forwards: [
            {name: 'Brett Hull', rating: 81}, {name: 'Brendan Shanahan', rating: 76},
            {name: 'Craig Janney', rating: 75}, {name: 'Nelson Emerson', rating: 70},
            {name: 'Kevin Miller', rating: 65}, {name: 'Ron Sutter', rating: 65},
            {name: 'Bob Bassen', rating: 57}, {name: 'Ron Wilson', rating: 50},
            {name: 'Rich Sutter', rating: 50}, {name: 'Dave Lowry', rating: 48},
            {name: 'Igor Korolev', rating: 46}, {name: 'Basil McRae', rating: 44},
            {name: 'Philippe Bozon', rating: 43}, {name: 'Kelly Chase', rating: 37}
        ],
        defensemen: [
            {name: 'Jeff Brown', rating: 71}, {name: 'Garth Butcher', rating: 55},
            {name: 'Doug Crossman', rating: 50}, {name: 'Stephane Quintal', rating: 48},
            {name: 'Lee Norwood', rating: 47}, {name: 'Rick Zombo', rating: 46},
            {name: 'Murray Baron', rating: 45}, {name: 'Curt Giles', rating: 43},
            {name: 'Bret Hedican', rating: 41}
        ],
        goalies: [
            {name: 'Curtis Joseph', rating: 77}, {name: 'Guy Hebert', rating: 45}
        ]
    },
    'Tampa Bay Lightning': {
        forwards: [
            {name: 'Brian Bradley', rating: 71}, {name: 'Chris Kontos', rating: 68},
            {name: 'Steve Kasper', rating: 55}, {name: 'John Tucker', rating: 54},
            {name: 'Marc Bureau', rating: 54}, {name: 'Rob Zamuner', rating: 52},
            {name: 'Mikael Andersson', rating: 52}, {name: 'Danton Cole', rating: 51},
            {name: 'Adam Creighton', rating: 50}, {name: 'Rob DiMaio', rating: 50},
            {name: 'Jason Lafreniere', rating: 48}, {name: 'Steve Maltais', rating: 47},
            {name: 'Randy Gilhen', rating: 45}, {name: 'Tim Bergland', rating: 44},
            {name: 'Stan Drulia', rating: 38}
        ],
        defensemen: [
            {name: 'Bob Beers', rating: 51}, {name: 'Roman Hamrlik', rating: 49},
            {name: 'Shawn Chambers', rating: 47}, {name: 'Joe Reekie', rating: 47},
            {name: 'Marc Bergevin', rating: 45}, {name: 'Matt Hervey', rating: 36},
            {name: 'Chris Lipuma', rating: 35}
        ],
        goalies: [
            {name: 'Wendell Young', rating: 48}, {name: 'Pat Jablonski', rating: 43},
            {name: 'J.C. Bergeron', rating: 41}
        ]
    },
    'Toronto Maple Leafs': {
        forwards: [
            {name: 'Doug Gilmour', rating: 89}, {name: 'Dave Andreychuk', rating: 72},
            {name: 'Glenn Anderson', rating: 71}, {name: 'Nikolai Borschevsky', rating: 71},
            {name: 'John Cullen', rating: 70}, {name: 'Wendel Clark', rating: 69},
            {name: 'Peter Zezel', rating: 64}, {name: 'Mike Krushelnyski', rating: 63},
            {name: 'Mike Foligno', rating: 54}, {name: 'Dave McLlwain', rating: 52},
            {name: 'Bill Berg', rating: 49}, {name: 'Mark Osborne', rating: 49},
            {name: 'Rob Pearson', rating: 48}, {name: 'Ken Baumgartner', rating: 38}
        ],
        defensemen: [
            {name: 'Dave Ellett', rating: 72}, {name: 'Jamie Macoun', rating: 60},
            {name: 'Todd Gill', rating: 56}, {name: 'Dmitri Mironov', rating: 51},
            {name: 'Bob Rouse', rating: 51}, {name: 'Drake Berehowsky', rating: 49},
            {name: 'Sylvain Lefebvre', rating: 45}, {name: 'Bob McGill', rating: 45}
        ],
        goalies: [
            {name: 'Felix Potvin', rating: 79}, {name: 'Daren Puppa', rating: 55},
            {name: 'Rick Wamsley', rating: 38}
        ]
    },
    'Vancouver Canucks': {
        forwards: [
            {name: 'Pavel Bure', rating: 90}, {name: 'Trevor Linden', rating: 78},
            {name: 'Cliff Ronning', rating: 76}, {name: 'Geoff Courtnall', rating: 73},
            {name: 'Greg Adams', rating: 70}, {name: 'Murray Craven', rating: 65},
            {name: 'Anatoli Semenov', rating: 61}, {name: 'Sergio Momesso', rating: 61},
            {name: 'Petr Nedved', rating: 60}, {name: 'Dixon Ward', rating: 56},
            {name: 'Tom Fergus', rating: 49}, {name: 'Garry Valk', rating: 49},
            {name: 'Jim Sandlak', rating: 48}, {name: 'Gino Odjick', rating: 47},
            {name: 'Tim Hunter', rating: 46}
        ],
        defensemen: [
            {name: 'Jyrki Lumme', rating: 64}, {name: 'Doug Lidster', rating: 60},
            {name: 'Gerald Diduck', rating: 56}, {name: 'Jiri Slegr', rating: 55},
            {name: 'Dana Murzyn', rating: 51}, {name: 'Dave Babych', rating: 50},
            {name: 'Adrien Plavsic', rating: 49}, {name: 'Robert Dirk', rating: 48}
        ],
        goalies: [
            {name: 'Kirk McLean', rating: 68}, {name: 'Kay Whitmore', rating: 50}
        ]
    },
    'Washington Capitals': {
        forwards: [
            {name: 'Peter Bondra', rating: 78}, {name: 'Dmitri Khristich', rating: 75},
            {name: 'Mike Ridley', rating: 73}, {name: 'Michal Pivonka', rating: 68},
            {name: 'Kelly Miller', rating: 67}, {name: 'Dale Hunter', rating: 63},
            {name: 'Bob Carpenter', rating: 62}, {name: 'Pat Elynuik', rating: 61},
            {name: 'Paul MacDermid', rating: 51}, {name: 'Alan May', rating: 48},
            {name: 'Todd Krygier', rating: 48}, {name: 'Keith Jones', rating: 48},
            {name: 'Steve Konowalchuk', rating: 46}, {name: 'Reggie Savage', rating: 44}
        ],
        defensemen: [
            {name: 'Al Iafrate', rating: 78}, {name: 'Kevin Hatcher', rating: 72},
            {name: 'Calle Johansson', rating: 66}, {name: 'Sylvain Cote', rating: 61},
            {name: 'Paul Cavallini', rating: 53}, {name: 'Shawn Anderson', rating: 44},
            {name: 'Rod Langway', rating: 44}, {name: 'Jason Woolley', rating: 39}
        ],
        goalies: [
            {name: 'Don Beaupre', rating: 51}, {name: 'Rick Tabaracci', rating: 41}
        ]
    },
    'Winnipeg Jets': {
        forwards: [
            {name: 'Teemu Selanne', rating: 90}, {name: 'Alexei Zhamnov', rating: 78},
            {name: 'Thomas Steen', rating: 73}, {name: 'Evgeny Davydov', rating: 64},
            {name: 'Darrin Shannon', rating: 62}, {name: 'Luciano Borsato', rating: 61},
            {name: 'Mike Eagles', rating: 58}, {name: 'Keith Tkachuk', rating: 55},
            {name: 'Kris King', rating: 53}, {name: 'Stu Barnes', rating: 51},
            {name: 'Bryan Erickson', rating: 51}, {name: 'John Druce', rating: 49},
            {name: 'Tie Domi', rating: 49}, {name: 'Russ Romaniuk', rating: 47},
            {name: 'Andy Brickley', rating: 44}
        ],
        defensemen: [
            {name: 'Phil Housley', rating: 84}, {name: 'Teppo Numminen', rating: 68},
            {name: 'Fredrik Olausson', rating: 64}, {name: 'Sergei Bautin', rating: 58},
            {name: 'Igor Ulanov', rating: 48}, {name: 'Mike Lalor', rating: 45},
            {name: 'Dean Kennedy', rating: 45}, {name: 'Randy Carlyle', rating: 44}
        ],
        goalies: [
            {name: 'Bob Essensa', rating: 74}, {name: 'Jim Hrivnak', rating: 43}
        ]
    }
};

const teamAbbr = {
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

function abbr(team) { return teamAbbr[team] || team; }

const top50Goals = [ 'Brett Hull', 'Sergei Fedorov', 'Dave Andreychuk', 'Brendan Shanahan', 'Ray Sheppard', 'Adam Graves', 'Mike Modano', 'Cam Neely', 'Jeremy Roenick', 'Wendel Clark', 'Eric Lindros', 'Luc Robitaille', 'Steve Thomas', 'Kevin Stevens', 'Gary Roberts', 'Keith Tkachuk', 'Geoff Sanderson', 'Mark Recchi', 'Robert Reichel', 'Vincent Damphousse', 'Theo Fleury', 'Bob Kudelski', 'Wayne Gretzky', 'Pierre Turgeon', 'Mikael Renberg', 'Joe Mullen', 'Pat Verbeek', 'John MacLean', 'Joe Nieuwendyk', 'Stéphane Richer', 'Benoit Hogue', 'Rod Brind\'Amour', 'Dale Hawerchuk', 'Vyacheslav Kozlov', 'Mike Gartner', 'Nelson Emerson', 'Brian Bellows', 'Jason Arnott', 'Adam Oates', 'Jaromír Jágr', 'Mats Sundin', 'Alexander Mogilny', 'Dave Gagner', 'Trevor Linden', 'Jari Kurri', 'Keith Primeau', 'Joe Murphy', 'Bryan Smolinski', 'Alexei Yashin'
];

const top50Assists = [
    'Wayne Gretzky', 'Doug Gilmour', 'Adam Oates', 'Sergei Zubov', 'Raymond Bourque', 'Craig Janney', 'Mark Recchi',
    'Jaromír Jágr', 'Ron Francis', 'Joé Juneau', 'Sergei Fedorov', 'Joe Sakic', 'Paul Coffey', 'Rod Brind\'Amour',
    'Jeremy Roenick', 'Scott Stevens', 'Garry Galley', 'Mark Messier', 'Steve Yzerman', 'Russ Courtnall',
    'Pierre Turgeon', 'Brian Leetch', 'Larry Murphy', 'Al MacInnis', 'Eric Lindros', 'Robert Reichel', 'Mats Sundin',
    'Jeff Brown', 'Vincent Damphousse', 'Dale Hawerchuk', 'Brendan Shanahan', 'Doug Weight', 'Alexei Yashin',
    'Rob Blake', 'Pavel Bure', 'Kevin Stevens', 'Alexander Mogilny', 'Vladimir Malakhov', 'Dave Andreychuk',
    'Jari Kurri', 'Nicklas Lidström', 'Theo Fleury', 'Alexei Zhamnov', 'Mikael Renberg', 'Mike Ridley',
    'Geoff Courtnall', 'Ulf Dahlén', 'Chris Chelios', 'Glen Wesley', 'Mike Modano', 'Gary Roberts'
];

const enforcers = [
    'Tie Domi', 'Shane Churla', 'Warren Rychel', 'Craig Berube', 'Kelly Chase', 'Lyle Odelein',
    'Bob Probert', 'Rob Ray', 'Todd Ewen', 'Marc Potvin', 'Gino Odjick', 'Keith Tkachuk',
    'Randy McKay', 'Ronnie Stern', 'Mike Peluso', 'Mick Vukota', 'Enrico Ciccone', 'Jeff Odgers',
    'Dennis Vial', 'Chris Chelios', 'Brendan Shanahan', 'Derian Hatcher', 'Kris King', 'Cam Russell',
    'Ulf Samuelsson', 'Kelly Buchberger', 'Stu Grimson', 'Marty McSorley', 'Dave Manson', 'Shawn Antoski'
];

const allStars = ['Mario Lemieux', 'Jaromír Jágr', 'Wayne Gretzky', 'Doug Gilmour', 'Adam Oates', 'Sergei Fedorov', 'Mark Recchi', 'Brendan Shanahan', 'Jeremy Roenick', 'Eric Lindros', 'Rod Brind\'Amour', 'Pierre Turgeon', 'Kevin Stevens', 'Pavel Bure', 'Joe Sakic', 'Paul Coffey', 'Brett Hull', 'Dale Hawerchuk', 'Vincent Damphousse', 'Robert Reichel', 'Mark Messier', 'Steve Yzerman', 'Brian Leetch', 'Ron Francis', 'Al MacInnis', 'Mats Sundin', 'Trevor Linden', 'Mike Modano', 'Alexei Zhamnov', 'Chris Chelios', 'Ray Bourque', 'Theoren Fleury', 'Luc Robitaille', 'Alexander Mogilny', 'Garry Galley', 'Sergei Zubov', 'Brian Bellows', 'Dave Andreychuk', 'Mike Gartner', 'Pat Verbeek', 'Joe Nieuwendyk', 'Dale Hawerchuk', 'Brian Leetch', 'Larry Murphy', 'Al MacInnis', 'Eric Lindros', 'Robert Reichel', 'Mats Sundin', 'Jeff Brown', 'Vincent Damphousse', 'Brendan Shanahan'];
const eliteAllStars = ['Wayne Gretzky', 'Sergei Fedorov', 'Adam Oates', 'Doug Gilmour', 'Pavel Bure', 'Jeremy Roenick', 'Mark Recchi', 'Brendan Shanahan', 'Dave Andreychuk', 'Jaromír Jágr'];


// Game state
let selectedTeam = null;
let currentDate = new Date('1993-10-05');
let teamStats = {};
let allGames = [];
let currentSortColumn = 'points';
let sortDirection = 'desc';
let currentFilter = 'league';
const teamAvgRatings = {};

function isSeasonOver() {
  return false;
}
// Custom modal function to replace alert/confirm
function showModal(message, callback) {
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modalMessage');
    const modalButtons = document.getElementById('modalButtons');
    if (modalMessage) {
        modalMessage.textContent = message;
    }
    if (modalButtons) {
        modalButtons.innerHTML = '';
    }
    
    if (callback) {
        const okBtn = document.createElement('button');
        okBtn.className = 'btn';
        okBtn.textContent = 'OK';
        okBtn.onclick = () => {
            closeModal();
            callback();
        };
        if (modalButtons) {
            modalButtons.appendChild(okBtn);
        }
    } else {
        const okBtn = document.createElement('button');
        okBtn.className = 'btn';
        okBtn.textContent = 'OK';
        okBtn.onclick = () => closeModal();
        if (modalButtons) {
            modalButtons.appendChild(okBtn);
        }
    }
    if (modal) {
        modal.classList.add('show');
    }
}

function closeModal(event) {
    const modal = document.getElementById('modal');
    if (event && event.target === modal) {
         if (modal) {
            modal.classList.remove('show');
         }
    } else if (!event) {
         if (modal) {
            modal.classList.remove('show');
         }
    }
    
    // ADD THESE LINES - Clear the modal content after closing
    setTimeout(() => {
        const modalContent = document.getElementById('modalContent');
        if (modalContent) {
            modalContent.innerHTML = `
                <p id="modalMessage">Message goes here.</p>
                <div id="modalButtons" class="modal-buttons">
                    <button class="btn" onclick="closeModal()">OK</button>
                </div>
            `;
        }
    }, 300); // Wait for animation to finish
}

// Screen navigation
function showMainMenu() {
  hideAllScreens();
  document.getElementById('mainMenu').classList.add('active');
  if (typeof checkSavedGame === 'function') checkSavedGame();
}

function showNewGame() {
  hideAllScreens();
  document.getElementById('newGameScreen').classList.add('active');
  if (typeof initializeNewGame === 'function') {
    initializeNewGame();   // sets state and renders the team grid
  } else {
    // fallback if init isn't present for some reason
    renderTeamSelection();
  }
}

function showCredits() {
    hideAllScreens();
    document.getElementById('creditsScreen').classList.add('active');
}

function showLeagueLeaders(filter = 'league', sortColumn = 'points', direction = 'desc') {
    hideAllScreens();
    document.getElementById('playerStatsScreen').classList.add('active');
    currentFilter = filter;
    currentSortColumn = sortColumn;
    sortDirection = direction;
    renderLeagueLeaders();
}

function backToGame() {
  hideAllScreens();
  document.getElementById('gameScreen').classList.add('active');
}

function hideAllScreens() {
  // remove "active" from every screen and clear any inline display that might linger
  document.querySelectorAll('.screen').forEach(el => {
    el.classList.remove('active');
    el.style.display = '';  // clears old style.display hacks
  });
}



// Initialize new game
function initializeNewGame() {
    selectedTeam = null;
    currentDate = new Date('1993-10-05');
    initializeTeamStats();
    initializeSchedule();
    renderTeamSelection();
    checkSavedGame();
}

// Initialize team stats
function initializeTeamStats() {
    Object.keys(teams).forEach(team => {
        const totalRating = Object.values(players[team]).flat().reduce((sum, player) => sum + player.rating, 0);
        const numPlayers = Object.values(players[team]).flat().length;
        const avgRating = totalRating / numPlayers;
        teams[team].avgRating = avgRating;
        
        teamStats[team] = {
            wins: 0,
            losses: 0,
            ties: 0,
            goalsFor: 0,
            goalsAgainst: 0,
            points: 0,
            playerStats: {}
        };
        // Initialize player stats for each team
        if (players[team]) {
            Object.values(players[team]).flat().forEach(player => {
                teamStats[team].playerStats[player.name] = { goals: 0, assists: 0, points: 0, pim: 0, gp: 0 };
            });
        }
    });
}

// Initialize 1993-94 NHL schedule
function initializeSchedule() {
    const scheduleData = [
        // October 1993
        ["1993-10-05",["New York Islanders","Calgary Flames"],["Detroit Red Wings","Dallas Stars"],["Boston Bruins","New York Rangers"],["Pittsburgh Penguins","Philadelphia Flyers"]],
        ["1993-10-06",["Florida Panthers","Chicago Blackhawks"],["San Jose Sharks","Edmonton Oilers"],["Vancouver Canucks","Los Angeles Kings"],["Hartford Whalers","Montreal Canadiens"],["Tampa Bay Lightning","New Jersey Devils"],["Quebec Nordiques","Ottawa Senators"],["Washington Capitals","Winnipeg Jets"]],
        ["1993-10-07",["Buffalo Sabres","Boston Bruins"],["San Jose Sharks","Calgary Flames"],["Tampa Bay Lightning","New York Rangers"],["Montreal Canadiens","Pittsburgh Penguins"],["Florida Panthers","St. Louis Blues"],["Dallas Stars","Toronto Maple Leafs"]],
        ["1993-10-08",["New York Islanders","Edmonton Oilers"],["Detroit Red Wings","Mighty Ducks of Anaheim"],["New Jersey Devils","Washington Capitals"]],
        ["1993-10-09",["Quebec Nordiques","Boston Bruins"],["Winnipeg Jets","Dallas Stars"],["Philadelphia Flyers","Hartford Whalers"],["Detroit Red Wings","Los Angeles Kings"],["Buffalo Sabres","Montreal Canadiens"],["Washington Capitals","New Jersey Devils"],["New York Rangers","Pittsburgh Penguins"],["Ottawa Senators","St. Louis Blues"],["Florida Panthers","Tampa Bay Lightning"],["Chicago Blackhawks","Toronto Maple Leafs"],["Calgary Flames","Vancouver Canucks"]],
        ["1993-10-10",["Hartford Whalers","Buffalo Sabres"],["Winnipeg Jets","Chicago Blackhawks"],["San Jose Sharks","Los Angeles Kings"],["New York Islanders","Mighty Ducks of Anaheim"],["Toronto Maple Leafs","Philadelphia Flyers"],["Pittsburgh Penguins","Quebec Nordiques"]],
        ["1993-10-11",["Montreal Canadiens","Boston Bruins"],["Washington Capitals","New York Rangers"],["Edmonton Oilers","Vancouver Canucks"]],
        ["1993-10-12",["Chicago Blackhawks","Dallas Stars"],["Pittsburgh Penguins","Florida Panthers"],["New York Islanders","Los Angeles Kings"],["Winnipeg Jets","New Jersey Devils"],["Buffalo Sabres","Philadelphia Flyers"]],
        ["1993-10-13",["St. Louis Blues","Detroit Red Wings"],["Montreal Canadiens","Hartford Whalers"],["Edmonton Oilers","Mighty Ducks of Anaheim"],["Quebec Nordiques","New York Rangers"],["Washington Capitals","Toronto Maple Leafs"]],
        ["1993-10-14",["Hartford Whalers","Chicago Blackhawks"],["Ottawa Senators","Florida Panthers"],["Edmonton Oilers","Los Angeles Kings"],["Calgary Flames","San Jose Sharks"],["Pittsburgh Penguins","Tampa Bay Lightning"]],
        ["1993-10-15",["New York Rangers","Buffalo Sabres"],["Boston Bruins","Mighty Ducks of Anaheim"],["Detroit Red Wings","Toronto Maple Leafs"],["Philadelphia Flyers","Washington Capitals"]],
        ["1993-10-16",["St. Louis Blues","Dallas Stars"],["Toronto Maple Leafs","Detroit Red Wings"],["Vancouver Canucks","Edmonton Oilers"],["Calgary Flames","Los Angeles Kings"],["Quebec Nordiques","Montreal Canadiens"],["New Jersey Devils","New York Islanders"],["New York Rangers","Philadelphia Flyers"],["Hartford Whalers","Pittsburgh Penguins"],["Boston Bruins","San Jose Sharks"],["Ottawa Senators","Tampa Bay Lightning"],["Chicago Blackhawks","Winnipeg Jets"],["Buffalo Sabres","Washington Capitals"]],
        ["1993-10-17",["Tampa Bay Lightning","Florida Panthers"],["Calgary Flames","Mighty Ducks of Anaheim"]],
        ["1993-10-18",["Detroit Red Wings","Buffalo Sabres"],["Dallas Stars","Chicago Blackhawks"],["Montreal Canadiens","Quebec Nordiques"],["Edmonton Oilers","Winnipeg Jets"]],
        ["1993-10-19",["Los Angeles Kings","Florida Panthers"],["Pittsburgh Penguins","New York Islanders"],["Mighty Ducks of Anaheim","New York Rangers"],["St. Louis Blues","San Jose Sharks"],["Hartford Whalers","Toronto Maple Leafs"],["Boston Bruins","Vancouver Canucks"]],
        ["1993-10-20",["Calgary Flames","Edmonton Oilers"],["Quebec Nordiques","Hartford Whalers"],["Dallas Stars","Montreal Canadiens"],["Mighty Ducks of Anaheim","New Jersey Devils"],["Los Angeles Kings","Tampa Bay Lightning"]],
        ["1993-10-21",["Vancouver Canucks","Calgary Flames"],["Quebec Nordiques","Chicago Blackhawks"],["Winnipeg Jets","Detroit Red Wings"],["Toronto Maple Leafs","Florida Panthers"],["Dallas Stars","Ottawa Senators"],["San Jose Sharks","St. Louis Blues"]],
        ["1993-10-22",["Pittsburgh Penguins","Buffalo Sabres"],["Boston Bruins","Edmonton Oilers"],["New York Islanders","Philadelphia Flyers"],["New York Rangers","Tampa Bay Lightning"],["Los Angeles Kings","Washington Capitals"]],
        ["1993-10-23",["Boston Bruins","Calgary Flames"],["Detroit Red Wings","Chicago Blackhawks"],["Buffalo Sabres","Hartford Whalers"],["Mighty Ducks of Anaheim","Montreal Canadiens"],["Florida Panthers","New Jersey Devils"],["Ottawa Senators","New York Islanders"],["Winnipeg Jets","Philadelphia Flyers"],["St. Louis Blues","Pittsburgh Penguins"],["Dallas Stars","Quebec Nordiques"],["Vancouver Canucks","San Jose Sharks"],["Toronto Maple Leafs","Tampa Bay Lightning"]],
        ["1993-10-24",["Washington Capitals","Edmonton Oilers"],["Los Angeles Kings","New York Rangers"],["San Jose Sharks","Vancouver Canucks"]],
        ["1993-10-25",["Washington Capitals","Calgary Flames"],["Dallas Stars","Detroit Red Wings"],["Mighty Ducks of Anaheim","Ottawa Senators"]],
        ["1993-10-26",["St. Louis Blues","Chicago Blackhawks"],["Winnipeg Jets","Florida Panthers"],["Montreal Canadiens","New Jersey Devils"],["Los Angeles Kings","New York Islanders"],["Philadelphia Flyers","Quebec Nordiques"],["Edmonton Oilers","San Jose Sharks"]],
        ["1993-10-27",["Buffalo Sabres","Calgary Flames"],["Hartford Whalers","Dallas Stars"],["Los Angeles Kings","Detroit Red Wings"],["Philadelphia Flyers","Ottawa Senators"],["Winnipeg Jets","Tampa Bay Lightning"],["Washington Capitals","Vancouver Canucks"]],
        ["1993-10-28",["Ottawa Senators","Boston Bruins"],["Toronto Maple Leafs","Chicago Blackhawks"],["New York Islanders","Florida Panthers"],["Montreal Canadiens","New York Rangers"],["Quebec Nordiques","Pittsburgh Penguins"],["Mighty Ducks of Anaheim","San Jose Sharks"],["Hartford Whalers","St. Louis Blues"]],
        ["1993-10-29",["Buffalo Sabres","Edmonton Oilers"],["Washington Capitals","Mighty Ducks of Anaheim"],["New York Islanders","Tampa Bay Lightning"],["Los Angeles Kings","Winnipeg Jets"]],
        ["1993-10-30",["St. Louis Blues","Boston Bruins"],["Edmonton Oilers","Calgary Flames"],["Ottawa Senators","Dallas Stars"],["Tampa Bay Lightning","Florida Panthers"],["New York Rangers","Hartford Whalers"],["Toronto Maple Leafs","Montreal Canadiens"],["Philadelphia Flyers","New Jersey Devils"],["Chicago Blackhawks","Pittsburgh Penguins"],["Detroit Red Wings","Quebec Nordiques"],["Washington Capitals","San Jose Sharks"],["Buffalo Sabres","Vancouver Canucks"]],
        ["1993-10-31",["Philadelphia Flyers","Chicago Blackhawks"],["San Jose Sharks","Mighty Ducks of Anaheim"],["New Jersey Devils","New York Rangers"],["Calgary Flames","Winnipeg Jets"]],
        // November 1993
        ["1993-11-01",["Toronto Maple Leafs","Dallas Stars"],["St. Louis Blues","Hartford Whalers"]],
        ["1993-11-02",["Boston Bruins","Detroit Red Wings"],["Philadelphia Flyers","Florida Panthers"],["Vancouver Canucks","New York Islanders"],["Tampa Bay Lightning","Quebec Nordiques"],["Pittsburgh Penguins","San Jose Sharks"]],
        ["1993-11-03",["Pittsburgh Penguins","Buffalo Sabres"],["Ottawa Senators","Edmonton Oilers"],["Calgary Flames","Hartford Whalers"],["New Jersey Devils","Los Angeles Kings"],["Dallas Stars","Mighty Ducks of Anaheim"],["Tampa Bay Lightning","Montreal Canadiens"],["Vancouver Canucks","New York Rangers"],["Florida Panthers","Toronto Maple Leafs"],["St. Louis Blues","Winnipeg Jets"]],
        ["1993-11-04",["Calgary Flames","Boston Bruins"],["New York Islanders","Chicago Blackhawks"],["Toronto Maple Leafs","Detroit Red Wings"],["Quebec Nordiques","Philadelphia Flyers"]],
        ["1993-11-05",["New Jersey Devils","Mighty Ducks of Anaheim"],["Dallas Stars","San Jose Sharks"],["Ottawa Senators","Winnipeg Jets"],["Vancouver Canucks","Washington Capitals"]],
        ["1993-11-06",["Tampa Bay Lightning","Boston Bruins"],["Pittsburgh Penguins","Los Angeles Kings"],["Calgary Flames","Montreal Canadiens"],["Hartford Whalers","New York Islanders"],["New York Rangers","Quebec Nordiques"],["Edmonton Oilers","St. Louis Blues"],["Philadelphia Flyers","Toronto Maple Leafs"]],
        ["1993-11-07",["Boston Bruins","Buffalo Sabres"],["Edmonton Oilers","Chicago Blackhawks"],["Winnipeg Jets","Dallas Stars"],["Pittsburgh Penguins","Mighty Ducks of Anaheim"],["Vancouver Canucks","Philadelphia Flyers"],["Florida Panthers","Quebec Nordiques"],["New Jersey Devils","San Jose Sharks"]],
        ["1993-11-08",["Tampa Bay Lightning","New York Rangers"]],
        ["1993-11-09",["Los Angeles Kings","Calgary Flames"],["Edmonton Oilers","Detroit Red Wings"],["Dallas Stars","Mighty Ducks of Anaheim"],["Winnipeg Jets","New York Islanders"],["Toronto Maple Leafs","San Jose Sharks"],["Pittsburgh Penguins","St. Louis Blues"],["Quebec Nordiques","Washington Capitals"]],
        ["1993-11-10",["Philadelphia Flyers","Buffalo Sabres"],["Ottawa Senators","Hartford Whalers"],["Florida Panthers","Montreal Canadiens"],["New York Islanders","New Jersey Devils"],["Winnipeg Jets","New York Rangers"],["Los Angeles Kings","Vancouver Canucks"]],
        ["1993-11-11",["Edmonton Oilers","Boston Bruins"],["Mighty Ducks of Anaheim","Calgary Flames"],["Pittsburgh Penguins","Chicago Blackhawks"],["San Jose Sharks","Dallas Stars"],["Florida Panthers","Ottawa Senators"],["New Jersey Devils","Philadelphia Flyers"],["Toronto Maple Leafs","St. Louis Blues"],["Washington Capitals","Tampa Bay Lightning"]],
        ["1993-11-13",["Vancouver Canucks","Calgary Flames"],["Edmonton Oilers","Hartford Whalers"],["St. Louis Blues","Los Angeles Kings"],["Ottawa Senators","Montreal Canadiens"],["San Jose Sharks","New Jersey Devils"],["Boston Bruins","New York Islanders"],["Buffalo Sabres","Philadelphia Flyers"],["Detroit Red Wings","Pittsburgh Penguins"],["Quebec Nordiques","Tampa Bay Lightning"],["Chicago Blackhawks","Toronto Maple Leafs"],["Dallas Stars","Winnipeg Jets"],["New York Rangers","Washington Capitals"]],
        ["1993-11-14",["Dallas Stars","Chicago Blackhawks"],["Quebec Nordiques","Florida Panthers"],["San Jose Sharks","New York Rangers"],["Mighty Ducks of Anaheim","Vancouver Canucks"]],
        ["1993-11-15",["Winnipeg Jets","Calgary Flames"],["Montreal Canadiens","Ottawa Senators"],["Edmonton Oilers","Toronto Maple Leafs"]],
        ["1993-11-16",["New York Rangers","Florida Panthers"],["Philadelphia Flyers","Pittsburgh Penguins"],["St. Louis Blues","Vancouver Canucks"],["San Jose Sharks","Washington Capitals"]],
        ["1993-11-17",["Tampa Bay Lightning","Dallas Stars"],["Boston Bruins","Hartford Whalers"],["Toronto Maple Leafs","Mighty Ducks of Anaheim"],["Edmonton Oilers","Montreal Canadiens"],["Buffalo Sabres","New Jersey Devils"],["New York Islanders","Ottawa Senators"],["Detroit Red Wings","Winnipeg Jets"]],
        ["1993-11-18",["San Jose Sharks","Boston Bruins"],["Chicago Blackhawks","Florida Panthers"],["Toronto Maple Leafs","Los Angeles Kings"],["New York Islanders","Montreal Canadiens"],["New Jersey Devils","Ottawa Senators"],["Hartford Whalers","Philadelphia Flyers"],["Washington Capitals","Pittsburgh Penguins"],["Calgary Flames","St. Louis Blues"]],
        ["1993-11-19",["Winnipeg Jets","Buffalo Sabres"],["New York Rangers","Tampa Bay Lightning"],["Mighty Ducks of Anaheim","Vancouver Canucks"]],
        ["1993-11-20",["Philadelphia Flyers","Boston Bruins"],["Calgary Flames","Dallas Stars"],["Toronto Maple Leafs","Edmonton Oilers"],["Washington Capitals","Florida Panthers"],["San Jose Sharks","Hartford Whalers"],["Pittsburgh Penguins","Montreal Canadiens"],["Detroit Red Wings","New Jersey Devils"],["Winnipeg Jets","Quebec Nordiques"],["Los Angeles Kings","St. Louis Blues"],["Chicago Blackhawks","Tampa Bay Lightning"]],
        ["1993-11-21",["San Jose Sharks","Buffalo Sabres"],["Los Angeles Kings","Dallas Stars"],["Mighty Ducks of Anaheim","Edmonton Oilers"],["New York Islanders","Philadelphia Flyers"],["Detroit Red Wings","St. Louis Blues"]],
        ["1993-11-22",["Mighty Ducks of Anaheim","Calgary Flames"],["Buffalo Sabres","Ottawa Senators"],["Toronto Maple Leafs","Vancouver Canucks"]],
        ["1993-11-23",["Hartford Whalers","Florida Panthers"],["Montreal Canadiens","New York Rangers"],["New Jersey Devils","Quebec Nordiques"],["Detroit Red Wings","San Jose Sharks"]],
        ["1993-11-24",["New Jersey Devils","Buffalo Sabres"],["Toronto Maple Leafs","Calgary Flames"],["New York Islanders","Dallas Stars"],["Chicago Blackhawks","Edmonton Oilers"],["New York Rangers","Ottawa Senators"],["Montreal Canadiens","Philadelphia Flyers"],["Boston Bruins","Pittsburgh Penguins"],["Hartford Whalers","Tampa Bay Lightning"],["Detroit Red Wings","Vancouver Canucks"],["Mighty Ducks of Anaheim","Winnipeg Jets"],["St. Louis Blues","Washington Capitals"]],
        ["1993-11-25",["Los Angeles Kings","Quebec Nordiques"]],
        ["1993-11-26",["Florida Panthers","Boston Bruins"],["Ottawa Senators","Buffalo Sabres"],["Chicago Blackhawks","Calgary Flames"],["San Jose Sharks","Mighty Ducks of Anaheim"],["Tampa Bay Lightning","Philadelphia Flyers"],["New Jersey Devils","St. Louis Blues"],["Vancouver Canucks","Winnipeg Jets"],["Pittsburgh Penguins","Washington Capitals"]],
        ["1993-11-27",["Dallas Stars","Detroit Red Wings"],["Vancouver Canucks","Edmonton Oilers"],["Florida Panthers","Hartford Whalers"],["Los Angeles Kings","Montreal Canadiens"],["New York Rangers","New York Islanders"],["Ottawa Senators","Pittsburgh Penguins"],["Buffalo Sabres","Quebec Nordiques"],["Mighty Ducks of Anaheim","San Jose Sharks"],["Philadelphia Flyers","Tampa Bay Lightning"],["Boston Bruins","Toronto Maple Leafs"]],
        ["1993-11-28",["Detroit Red Wings","New York Islanders"],["Washington Capitals","New York Rangers"],["Winnipeg Jets","St. Louis Blues"]],
        ["1993-11-29",["Dallas Stars","Edmonton Oilers"],["Hartford Whalers","Ottawa Senators"],["Buffalo Sabres","Toronto Maple Leafs"],["Chicago Blackhawks","Vancouver Canucks"]],
        ["1993-11-30",["Dallas Stars","Calgary Flames"],["Winnipeg Jets","Los Angeles Kings"],["New York Rangers","New Jersey Devils"],["Washington Capitals","New York Islanders"],["Boston Bruins","Quebec Nordiques"]],
        // December 1993
        ["1993-12-01",["Philadelphia Flyers","Edmonton Oilers"],["Detroit Red Wings","Hartford Whalers"],["Winnipeg Jets","Mighty Ducks of Anaheim"],["Ottawa Senators","Montreal Canadiens"],["Buffalo Sabres","Tampa Bay Lightning"],["St. Louis Blues","Toronto Maple Leafs"]],
        ["1993-12-02",["New York Islanders","Boston Bruins"],["Buffalo Sabres","Florida Panthers"],["Mighty Ducks of Anaheim","Los Angeles Kings"],["New Jersey Devils","Pittsburgh Penguins"],["Toronto Maple Leafs","St. Louis Blues"],["Philadelphia Flyers","Vancouver Canucks"]],
        ["1993-12-03",["Ottawa Senators","Detroit Red Wings"],["Quebec Nordiques","New York Islanders"],["Winnipeg Jets","San Jose Sharks"],["Montreal Canadiens","Washington Capitals"]],
        ["1993-12-04",["Montreal Canadiens","Boston Bruins"],["Philadelphia Flyers","Calgary Flames"],["Pittsburgh Penguins","Hartford Whalers"],["Tampa Bay Lightning","Los Angeles Kings"],["Chicago Blackhawks","New Jersey Devils"],["Washington Capitals","Ottawa Senators"],["Vancouver Canucks","Quebec Nordiques"],["Dallas Stars","St. Louis Blues"],["New York Rangers","Toronto Maple Leafs"]],
        ["1993-12-05",["Boston Bruins","Buffalo Sabres"],["Edmonton Oilers","Dallas Stars"],["Tampa Bay Lightning","Mighty Ducks of Anaheim"],["New Jersey Devils","New York Rangers"],["Florida Panthers","San Jose Sharks"],["Detroit Red Wings","Winnipeg Jets"]],
        ["1993-12-06",["Winnipeg Jets","Detroit Red Wings"],["Vancouver Canucks","Montreal Canadiens"],["Calgary Flames","Ottawa Senators"]],
        ["1993-12-07",["Florida Panthers","Mighty Ducks of Anaheim"],["Edmonton Oilers","New York Islanders"],["Calgary Flames","Quebec Nordiques"],["Tampa Bay Lightning","San Jose Sharks"],["Chicago Blackhawks","St. Louis Blues"],["Hartford Whalers","Washington Capitals"]],
        ["1993-12-08",["Pittsburgh Penguins","Dallas Stars"],["Vancouver Canucks","Hartford Whalers"],["Florida Panthers","Los Angeles Kings"],["New Jersey Devils","Montreal Canadiens"],["Edmonton Oilers","New York Rangers"],["Buffalo Sabres","Ottawa Senators"],["Winnipeg Jets","Toronto Maple Leafs"]],
        ["1993-12-09",["Vancouver Canucks","Boston Bruins"],["Ottawa Senators","Dallas Stars"],["St. Louis Blues","Detroit Red Wings"],["Quebec Nordiques","New Jersey Devils"],["Washington Capitals","Philadelphia Flyers"]],
        ["1993-12-10",["Calgary Flames","Buffalo Sabres"],["Florida Panthers","Winnipeg Jets"]],
        ["1993-12-11",["Chicago Blackhawks","Boston Bruins"],["San Jose Sharks","Detroit Red Wings"],["Buffalo Sabres","Hartford Whalers"],["St. Louis Blues","Los Angeles Kings"],["Washington Capitals","Montreal Canadiens"],["Edmonton Oilers","New Jersey Devils"],["Philadelphia Flyers","New York Islanders"],["Ottawa Senators","Quebec Nordiques"],["Pittsburgh Penguins","Tampa Bay Lightning"],["Calgary Flames","Toronto Maple Leafs"]],
        ["1993-12-12",["Hartford Whalers","Boston Bruins"],["San Jose Sharks","Chicago Blackhawks"],["Florida Panthers","Dallas Stars"],["St. Louis Blues","Mighty Ducks of Anaheim"],["Edmonton Oilers","Philadelphia Flyers"],["Toronto Maple Leafs","Winnipeg Jets"]],
        ["1993-12-13",["Buffalo Sabres","New York Rangers"],["Los Angeles Kings","Ottawa Senators"],["Washington Capitals","Quebec Nordiques"]],
        ["1993-12-14",["Vancouver Canucks","Calgary Flames"],["Mighty Ducks of Anaheim","Detroit Red Wings"],["New Jersey Devils","New York Islanders"],["Los Angeles Kings","Pittsburgh Penguins"],["Montreal Canadiens","Tampa Bay Lightning"]],
        ["1993-12-15",["Chicago Blackhawks","Dallas Stars"],["Vancouver Canucks","Edmonton Oilers"],["Montreal Canadiens","Florida Panthers"],["Boston Bruins","New Jersey Devils"],["Hartford Whalers","New York Rangers"],["St. Louis Blues","San Jose Sharks"],["Ottawa Senators","Tampa Bay Lightning"],["Mighty Ducks of Anaheim","Toronto Maple Leafs"]],
        ["1993-12-16",["Quebec Nordiques","Philadelphia Flyers"],["Buffalo Sabres","Pittsburgh Penguins"]],
        ["1993-12-17",["Los Angeles Kings","Buffalo Sabres"],["St. Louis Blues","Calgary Flames"],["Mighty Ducks of Anaheim","Dallas Stars"],["New York Rangers","Detroit Red Wings"],["San Jose Sharks","Edmonton Oilers"],["Toronto Maple Leafs","New York Islanders"],["Winnipeg Jets","Vancouver Canucks"],["Ottawa Senators","Washington Capitals"]],
        ["1993-12-18",["Winnipeg Jets","Calgary Flames"],["Washington Capitals","Hartford Whalers"],["Detroit Red Wings","Montreal Canadiens"],["Chicago Blackhawks","Philadelphia Flyers"],["New Jersey Devils","Quebec Nordiques"],["Boston Bruins","Tampa Bay Lightning"],["Los Angeles Kings","Toronto Maple Leafs"]],
        ["1993-12-19",["Tampa Bay Lightning","Buffalo Sabres"],["Mighty Ducks of Anaheim","Chicago Blackhawks"],["St. Louis Blues","Edmonton Oilers"],["Boston Bruins","Florida Panthers"],["Philadelphia Flyers","New Jersey Devils"],["Ottawa Senators","New York Rangers"],["New York Islanders","Pittsburgh Penguins"],["San Jose Sharks","Quebec Nordiques"],["Dallas Stars","Vancouver Canucks"]],
        ["1993-12-20",["Los Angeles Kings","Calgary Flames"],["Mighty Ducks of Anaheim","Winnipeg Jets"]],
        ["1993-12-21",["Chicago Blackhawks","Detroit Red Wings"],["Quebec Nordiques","Ottawa Senators"],["Washington Capitals","Philadelphia Flyers"],["Tampa Bay Lightning","Pittsburgh Penguins"],["Edmonton Oilers","Vancouver Canucks"]],
        ["1993-12-22",["Calgary Flames","Edmonton Oilers"],["New York Rangers","Florida Panthers"],["New Jersey Devils","Hartford Whalers"],["Dallas Stars","Mighty Ducks of Anaheim"],["New York Islanders","Montreal Canadiens"],["San Jose Sharks","Toronto Maple Leafs"]],
        ["1993-12-23",["Pittsburgh Penguins","Boston Bruins"],["Montreal Canadiens","Buffalo Sabres"],["San Jose Sharks","Chicago Blackhawks"],["Dallas Stars","Los Angeles Kings"],["Toronto Maple Leafs","New Jersey Devils"],["Hartford Whalers","Ottawa Senators"],["Detroit Red Wings","Philadelphia Flyers"],["Tampa Bay Lightning","St. Louis Blues"],["Calgary Flames","Vancouver Canucks"],["Quebec Nordiques","Winnipeg Jets"],["New York Rangers","Washington Capitals"]],
        ["1993-12-26",["Ottawa Senators","Hartford Whalers"],["Los Angeles Kings","Mighty Ducks of Anaheim"],["Buffalo Sabres","New York Islanders"],["New Jersey Devils","New York Rangers"],["Chicago Blackhawks","St. Louis Blues"],["Florida Panthers","Tampa Bay Lightning"],["Pittsburgh Penguins","Washington Capitals"]],
        ["1993-12-27",["Philadelphia Flyers","Buffalo Sabres"],["Toronto Maple Leafs","Chicago Blackhawks"],["Detroit Red Wings","Dallas Stars"],["Winnipeg Jets","Edmonton Oilers"],["Boston Bruins","Ottawa Senators"],["Montreal Canadiens","St. Louis Blues"]],
        ["1993-12-28",["Vancouver Canucks","Los Angeles Kings"],["Hartford Whalers","New Jersey Devils"],["Mighty Ducks of Anaheim","New York Islanders"],["Philadelphia Flyers","Pittsburgh Penguins"],["Tampa Bay Lightning","Quebec Nordiques"],["Calgary Flames","San Jose Sharks"],["Florida Panthers","Washington Capitals"]],
        ["1993-12-29",["Toronto Maple Leafs","Dallas Stars"],["Montreal Canadiens","Edmonton Oilers"],["Florida Panthers","Hartford Whalers"],["New York Islanders","Quebec Nordiques"],["New York Rangers","St. Louis Blues"],["Chicago Blackhawks","Winnipeg Jets"]],
        ["1993-12-30",["Edmonton Oilers","Calgary Flames"],["Tampa Bay Lightning","Ottawa Senators"],["Mighty Ducks of Anaheim","Washington Capitals"]],
        ["1993-12-31",["Philadelphia Flyers","Boston Bruins"],["New York Rangers","Buffalo Sabres"],["Montreal Canadiens","Calgary Flames"],["Dallas Stars","Chicago Blackhawks"],["Los Angeles Kings","Detroit Red Wings"],["Quebec Nordiques","Pittsburgh Penguins"],["San Jose Sharks","Vancouver Canucks"],["St. Louis Blues","Winnipeg Jets"]],
        ["1994-01-01",["Mighty Ducks of Anaheim","Florida Panthers"],["Hartford Whalers","New York Islanders"],["New Jersey Devils","Ottawa Senators"],["Los Angeles Kings","Toronto Maple Leafs"],["Tampa Bay Lightning","Washington Capitals"]],
        // January 1994
        ["1994-01-02",["Washington Capitals","Boston Bruins"],["Toronto Maple Leafs","Buffalo Sabres"],["Winnipeg Jets","Chicago Blackhawks"],["Quebec Nordiques","Dallas Stars"],["San Jose Sharks","Edmonton Oilers"],["Pittsburgh Penguins","Hartford Whalers"],["Calgary Flames","St. Louis Blues"],["Mighty Ducks of Anaheim","Tampa Bay Lightning"],["Montreal Canadiens","Vancouver Canucks"]],
        ["1994-01-03",["Florida Panthers","New York Rangers"],["Pittsburgh Penguins","Ottawa Senators"]],
        ["1994-01-04",["Chicago Blackhawks","Dallas Stars"],["Quebec Nordiques","Los Angeles Kings"],["New York Islanders","New Jersey Devils"],["Montreal Canadiens","San Jose Sharks"],["Detroit Red Wings","St. Louis Blues"],["Tampa Bay Lightning","Toronto Maple Leafs"]],
        ["1994-01-05",["Winnipeg Jets","Hartford Whalers"],["Calgary Flames","New York Rangers"],["Vancouver Canucks","Ottawa Senators"],["Montreal Canadiens","Quebec Nordiques"]],
        ["1994-01-06",["Winnipeg Jets","Boston Bruins"],["Mighty Ducks of Anaheim","Chicago Blackhawks"],["Philadelphia Flyers","Dallas Stars"],["St. Louis Blues","Hartford Whalers"],["Detroit Red Wings","San Jose Sharks"],["Ottawa Senators","Toronto Maple Leafs"]],
        ["1994-01-07",["Pittsburgh Penguins","Buffalo Sabres"],["Quebec Nordiques","Edmonton Oilers"],["Florida Panthers","New Jersey Devils"],["Calgary Flames","New York Islanders"]],
        ["1994-01-08",["Florida Panthers","Boston Bruins"],["New York Islanders","Hartford Whalers"],["Detroit Red Wings","Los Angeles Kings"],["New York Rangers","Montreal Canadiens"],["Winnipeg Jets","Ottawa Senators"],["Calgary Flames","Pittsburgh Penguins"],["Mighty Ducks of Anaheim","St. Louis Blues"],["Philadelphia Flyers","Tampa Bay Lightning"],["Vancouver Canucks","Toronto Maple Leafs"],["Chicago Blackhawks","Washington Capitals"]],
        ["1994-01-09",["Vancouver Canucks","Buffalo Sabres"],["Edmonton Oilers","Chicago Blackhawks"],["St. Louis Blues","Dallas Stars"],["Washington Capitals","New Jersey Devils"]],
        ["1994-01-10",["Toronto Maple Leafs","Boston Bruins"],["Detroit Red Wings","Mighty Ducks of Anaheim"],["Winnipeg Jets","Montreal Canadiens"],["Tampa Bay Lightning","New York Rangers"],["New York Islanders","Ottawa Senators"]],
        ["1994-01-11",["Quebec Nordiques","Calgary Flames"],["Buffalo Sabres","Chicago Blackhawks"],["Edmonton Oilers","Dallas Stars"],["Ottawa Senators","Philadelphia Flyers"],["Boston Bruins","Pittsburgh Penguins"],["Los Angeles Kings","San Jose Sharks"],["Toronto Maple Leafs","Washington Capitals"]],
        ["1994-01-12",["Tampa Bay Lightning","Detroit Red Wings"],["Hartford Whalers","Los Angeles Kings"],["San Jose Sharks","Mighty Ducks of Anaheim"],["New Jersey Devils","Montreal Canadiens"],["Quebec Nordiques","Vancouver Canucks"],["Buffalo Sabres","Winnipeg Jets"]],
        ["1994-01-13",["Tampa Bay Lightning","Chicago Blackhawks"],["Boston Bruins","Philadelphia Flyers"],["Florida Panthers","Pittsburgh Penguins"],["Edmonton Oilers","St. Louis Blues"],["Dallas Stars","Toronto Maple Leafs"]],
        ["1994-01-14",["Dallas Stars","Detroit Red Wings"],["Hartford Whalers","Mighty Ducks of Anaheim"],["Montreal Canadiens","New York Islanders"],["Philadelphia Flyers","New York Rangers"],["Ottawa Senators","Vancouver Canucks"],["New Jersey Devils","Washington Capitals"]],
        ["1994-01-15",["Detroit Red Wings","Boston Bruins"],["Ottawa Senators","Calgary Flames"],["Florida Panthers","Montreal Canadiens"],["Los Angeles Kings","New Jersey Devils"],["Chicago Blackhawks","New York Islanders"],["Edmonton Oilers","Pittsburgh Penguins"],["Washington Capitals","Quebec Nordiques"],["Hartford Whalers","San Jose Sharks"],["Buffalo Sabres","St. Louis Blues"],["Toronto Maple Leafs","Winnipeg Jets"]],
        ["1994-01-16",["New York Rangers","Chicago Blackhawks"],["Buffalo Sabres","Dallas Stars"],["Vancouver Canucks","Mighty Ducks of Anaheim"],["Los Angeles Kings","Philadelphia Flyers"],["Tampa Bay Lightning","Winnipeg Jets"]],
        ["1994-01-17",["Hartford Whalers","Boston Bruins"],["Washington Capitals","Montreal Canadiens"],["Florida Panthers","New York Islanders"],["Calgary Flames","San Jose Sharks"],["Detroit Red Wings","Tampa Bay Lightning"]],
        ["1994-01-18",["Los Angeles Kings","Dallas Stars"],["St. Louis Blues","New York Rangers"],["Edmonton Oilers","Ottawa Senators"],["Pittsburgh Penguins","Quebec Nordiques"],["Mighty Ducks of Anaheim","Toronto Maple Leafs"]],
        ["1994-01-19",["Edmonton Oilers","Buffalo Sabres"],["Mighty Ducks of Anaheim","Detroit Red Wings"],["Washington Capitals","Florida Panthers"],["Toronto Maple Leafs","Hartford Whalers"],["Boston Bruins","Montreal Canadiens"],["St. Louis Blues","Philadelphia Flyers"],["New York Islanders","Tampa Bay Lightning"],["Calgary Flames","Vancouver Canucks"],["New Jersey Devils","Winnipeg Jets"]],
        ["1994-01-24",["Los Angeles Kings","Calgary Flames"],["New Jersey Devils","Dallas Stars"],["Vancouver Canucks","Edmonton Oilers"],["Montreal Canadiens","Florida Panthers"],["Boston Bruins","Hartford Whalers"],["St. Louis Blues","Mighty Ducks of Anaheim"],["Buffalo Sabres","Tampa Bay Lightning"]],
        ["1994-01-25",["Chicago Blackhawks","Detroit Red Wings"],["Winnipeg Jets","Los Angeles Kings"],["Ottawa Senators","Pittsburgh Penguins"],["Philadelphia Flyers","Quebec Nordiques"],["New York Rangers","San Jose Sharks"],["St. Louis Blues","Vancouver Canucks"],["Boston Bruins","Washington Capitals"]],
        ["1994-01-26",["Dallas Stars","Calgary Flames"],["New Jersey Devils","Edmonton Oilers"],["Montreal Canadiens","Hartford Whalers"],["Winnipeg Jets","Mighty Ducks of Anaheim"],["Florida Panthers","Tampa Bay Lightning"],["New York Islanders","Toronto Maple Leafs"]],
        ["1994-01-27",["Washington Capitals","Buffalo Sabres"],["Detroit Red Wings","Chicago Blackhawks"],["New York Rangers","Los Angeles Kings"],["Hartford Whalers","Ottawa Senators"],["Quebec Nordiques","Pittsburgh Penguins"],["Dallas Stars","Vancouver Canucks"]],
        ["1994-01-28",["New Jersey Devils","Calgary Flames"],["St. Louis Blues","Edmonton Oilers"],["San Jose Sharks","Florida Panthers"],["New York Rangers","Mighty Ducks of Anaheim"],["Boston Bruins","New York Islanders"]],
        ["1994-01-29",["New York Islanders","Boston Bruins"],["St. Louis Blues","Calgary Flames"],["Ottawa Senators","Chicago Blackhawks"],["Winnipeg Jets","Detroit Red Wings"],["Dallas Stars","Edmonton Oilers"],["Quebec Nordiques","Hartford Whalers"],["Mighty Ducks of Anaheim","Los Angeles Kings"],["Buffalo Sabres","Montreal Canadiens"],["Washington Capitals","Philadelphia Flyers"],["San Jose Sharks","Tampa Bay Lightning"],["Pittsburgh Penguins","Toronto Maple Leafs"],["New Jersey Devils","Vancouver Canucks"]],
        ["1994-01-30",["Florida Panthers","Buffalo Sabres"],["Philadelphia Flyers","Montreal Canadiens"],["Detroit Red Wings","Washington Capitals"]],
        ["1994-01-31",["Quebec Nordiques","Boston Bruins"],["Pittsburgh Penguins","New York Rangers"],["Chicago Blackhawks","Ottawa Senators"],["Los Angeles Kings","Vancouver Canucks"]],
        // February 1994
        ["1994-02-01",["San Jose Sharks","New York Islanders"],["Florida Panthers","Pittsburgh Penguins"],["Hartford Whalers","Quebec Nordiques"],["Toronto Maple Leafs","St. Louis Blues"]],
        ["1994-02-02",["Los Angeles Kings","Edmonton Oilers"],["Calgary Flames","Mighty Ducks of Anaheim"],["Hartford Whalers","Montreal Canadiens"],["Buffalo Sabres","New Jersey Devils"],["New York Islanders","New York Rangers"],["Florida Panthers","Ottawa Senators"],["Washington Capitals","Philadelphia Flyers"],["Detroit Red Wings","Tampa Bay Lightning"],["Chicago Blackhawks","Vancouver Canucks"],["Dallas Stars","Winnipeg Jets"]],
        ["1994-02-03",["New York Rangers","Boston Bruins"],["San Jose Sharks","Philadelphia Flyers"],["Quebec Nordiques","St. Louis Blues"]],
        ["1994-02-04",["Pittsburgh Penguins","Detroit Red Wings"],["Chicago Blackhawks","Edmonton Oilers"],["Buffalo Sabres","Florida Panthers"],["Vancouver Canucks","Mighty Ducks of Anaheim"],["Ottawa Senators","New Jersey Devils"],["Hartford Whalers","Winnipeg Jets"],["Montreal Canadiens","Washington Capitals"]],
        ["1994-02-05",["Philadelphia Flyers","Boston Bruins"],["Calgary Flames","Los Angeles Kings"],["Pittsburgh Penguins","New Jersey Devils"],["Montreal Canadiens","Ottawa Senators"],["New York Islanders","Quebec Nordiques"],["San Jose Sharks","St. Louis Blues"],["Detroit Red Wings","Toronto Maple Leafs"],["Tampa Bay Lightning","Washington Capitals"]],
        ["1994-02-06",["New York Islanders","Buffalo Sabres"],["San Jose Sharks","Dallas Stars"],["Winnipeg Jets","Edmonton Oilers"],["Boston Bruins","Florida Panthers"],["Chicago Blackhawks","Mighty Ducks of Anaheim"],["Hartford Whalers","Vancouver Canucks"]],
        ["1994-02-07",["Edmonton Oilers","Calgary Flames"],["Washington Capitals","New York Rangers"],["Montreal Canadiens","Pittsburgh Penguins"],["Tampa Bay Lightning","Toronto Maple Leafs"]],
        ["1994-02-08",["Vancouver Canucks","Detroit Red Wings"],["Buffalo Sabres","New York Islanders"],["Philadelphia Flyers","Ottawa Senators"],["Boston Bruins","Quebec Nordiques"],["Chicago Blackhawks","San Jose Sharks"],["Winnipeg Jets","St. Louis Blues"]],
        ["1994-02-09",["Winnipeg Jets","Dallas Stars"],["Calgary Flames","Edmonton Oilers"],["Chicago Blackhawks","Los Angeles Kings"],["New York Rangers","Montreal Canadiens"]],
        ["1994-02-10",["Buffalo Sabres","Boston Bruins"],["Vancouver Canucks","New Jersey Devils"],["Tampa Bay Lightning","Ottawa Senators"],["Florida Panthers","Philadelphia Flyers"],["New York Islanders","Pittsburgh Penguins"],["Washington Capitals","St. Louis Blues"]],
        ["1994-02-11",["Montreal Canadiens","Buffalo Sabres"],["Hartford Whalers","Calgary Flames"],["Philadelphia Flyers","Detroit Red Wings"],["Los Angeles Kings","Mighty Ducks of Anaheim"],["Chicago Blackhawks","San Jose Sharks"],["Toronto Maple Leafs","Winnipeg Jets"]],
        ["1994-02-12",["New Jersey Devils","Boston Bruins"],["Toronto Maple Leafs","Calgary Flames"],["Hartford Whalers","Edmonton Oilers"],["Washington Capitals","Los Angeles Kings"],["Quebec Nordiques","Montreal Canadiens"],["Florida Panthers","New York Islanders"],["New York Rangers","Ottawa Senators"],["Dallas Stars","Pittsburgh Penguins"],["Detroit Red Wings","St. Louis Blues"],["Vancouver Canucks","Tampa Bay Lightning"]],
        ["1994-02-13",["Dallas Stars","Buffalo Sabres"],["Mighty Ducks of Anaheim","Edmonton Oilers"],["Vancouver Canucks","Florida Panthers"],["Pittsburgh Penguins","Philadelphia Flyers"],["Chicago Blackhawks","San Jose Sharks"],["New Jersey Devils","Tampa Bay Lightning"]],
        ["1994-02-14",["Chicago Blackhawks","Calgary Flames"],["Boston Bruins","Los Angeles Kings"],["New York Rangers","Quebec Nordiques"]],
        ["1994-02-15",["Tampa Bay Lightning","New York Islanders"],["Winnipeg Jets","Pittsburgh Penguins"],["Philadelphia Flyers","San Jose Sharks"],["Vancouver Canucks","St. Louis Blues"],["Detroit Red Wings","Toronto Maple Leafs"],["Edmonton Oilers","Washington Capitals"]],
        ["1994-02-16",["Boston Bruins","Dallas Stars"],["Florida Panthers","Detroit Red Wings"],["Buffalo Sabres","Hartford Whalers"],["Philadelphia Flyers","Mighty Ducks of Anaheim"]],
        ["1994-02-17",["Vancouver Canucks","Chicago Blackhawks"],["Hartford Whalers","Pittsburgh Penguins"],["Quebec Nordiques","San Jose Sharks"],["Montreal Canadiens","Tampa Bay Lightning"],["New Jersey Devils","Toronto Maple Leafs"]],
        ["1994-02-18",["Florida Panthers","Buffalo Sabres"],["Calgary Flames","Dallas Stars"],["Edmonton Oilers","Detroit Red Wings"],["Philadelphia Flyers","Los Angeles Kings"],["Quebec Nordiques","Mighty Ducks of Anaheim"],["Ottawa Senators","New York Rangers"],["Boston Bruins","St. Louis Blues"],["Chicago Blackhawks","Winnipeg Jets"],["New York Islanders","Washington Capitals"]],
        ["1994-02-19",["New York Rangers","Hartford Whalers"],["Pittsburgh Penguins","Montreal Canadiens"],["Tampa Bay Lightning","New Jersey Devils"],["Ottawa Senators","New York Islanders"],["Los Angeles Kings","San Jose Sharks"],["Edmonton Oilers","Toronto Maple Leafs"]],
        ["1994-02-20",["New Jersey Devils","Chicago Blackhawks"],["Detroit Red Wings","Florida Panthers"],["Mighty Ducks of Anaheim","St. Louis Blues"],["Boston Bruins","Tampa Bay Lightning"],["Calgary Flames","Winnipeg Jets"],["Buffalo Sabres","Washington Capitals"]],
        ["1994-02-21",["Quebec Nordiques","Buffalo Sabres"],["Toronto Maple Leafs","Los Angeles Kings"],["Washington Capitals","New York Islanders"],["Pittsburgh Penguins","New York Rangers"],["Montreal Canadiens","Philadelphia Flyers"],["Dallas Stars","San Jose Sharks"]],
        ["1994-02-22",["Calgary Flames","Vancouver Canucks"],["Florida Panthers","Winnipeg Jets"]],
        ["1994-02-23",["Mighty Ducks of Anaheim","Buffalo Sabres"],["New Jersey Devils","Detroit Red Wings"],["Toronto Maple Leafs","Edmonton Oilers"],["Dallas Stars","Los Angeles Kings"],["San Jose Sharks","Montreal Canadiens"],["Boston Bruins","New York Rangers"]],
        ["1994-02-24",["Tampa Bay Lightning","Calgary Flames"],["Winnipeg Jets","Chicago Blackhawks"],["Hartford Whalers","Detroit Red Wings"],["Washington Capitals","Florida Panthers"],["New York Rangers","New Jersey Devils"],["San Jose Sharks","Ottawa Senators"],["New York Islanders","Philadelphia Flyers"],["Mighty Ducks of Anaheim","Pittsburgh Penguins"],["St. Louis Blues","Quebec Nordiques"]],
        ["1994-02-25",["Chicago Blackhawks","Buffalo Sabres"],["Los Angeles Kings","Edmonton Oilers"],["Philadelphia Flyers","New York Islanders"],["Boston Bruins","Winnipeg Jets"]],
        ["1994-02-26",["Los Angeles Kings","Calgary Flames"],["New York Rangers","Dallas Stars"],["San Jose Sharks","Detroit Red Wings"],["New Jersey Devils","Hartford Whalers"],["St. Louis Blues","Ottawa Senators"],["Buffalo Sabres","Pittsburgh Penguins"],["Mighty Ducks of Anaheim","Quebec Nordiques"],["Montreal Canadiens","Toronto Maple Leafs"],["Tampa Bay Lightning","Vancouver Canucks"],["Florida Panthers","Washington Capitals"]],
        ["1994-02-27",["Boston Bruins","Chicago Blackhawks"],["Tampa Bay Lightning","Edmonton Oilers"],["Washington Capitals","Hartford Whalers"],["Quebec Nordiques","New York Islanders"]],
        ["1994-02-28",["Pittsburgh Penguins","Florida Panthers"],["Montreal Canadiens","Los Angeles Kings"],["St. Louis Blues","New Jersey Devils"],["Philadelphia Flyers","New York Rangers"],["Toronto Maple Leafs","Ottawa Senators"],["San Jose Sharks","Winnipeg Jets"]],
        // March 1994
        ["1994-03-01",["Calgary Flames","Detroit Red Wings"],["St. Louis Blues","New York Islanders"],["Edmonton Oilers","Vancouver Canucks"],["Tampa Bay Lightning","Washington Capitals"]],
        ["1994-03-02",["New Jersey Devils","Florida Panthers"],["Los Angeles Kings","Hartford Whalers"],["Montreal Canadiens","Mighty Ducks of Anaheim"],["Quebec Nordiques","New York Rangers"],["Buffalo Sabres","Ottawa Senators"],["Dallas Stars","Winnipeg Jets"]],
        ["1994-03-03",["Los Angeles Kings","Boston Bruins"],["Calgary Flames","Chicago Blackhawks"],["Edmonton Oilers","San Jose Sharks"],["Vancouver Canucks","St. Louis Blues"],["New Jersey Devils","Tampa Bay Lightning"]],
        ["1994-03-04",["Pittsburgh Penguins","Buffalo Sabres"],["Vancouver Canucks","Dallas Stars"],["Toronto Maple Leafs","Detroit Red Wings"],["Hartford Whalers","Florida Panthers"],["Edmonton Oilers","Mighty Ducks of Anaheim"],["New York Islanders","New York Rangers"],["Winnipeg Jets","Ottawa Senators"],["Philadelphia Flyers","Washington Capitals"]],
        ["1994-03-05",["Ottawa Senators","Boston Bruins"],["Calgary Flames","New Jersey Devils"],["New York Rangers","New York Islanders"],["Toronto Maple Leafs","Quebec Nordiques"],["Hartford Whalers","Tampa Bay Lightning"]],
        ["1994-03-06",["Los Angeles Kings","Chicago Blackhawks"],["Montreal Canadiens","Dallas Stars"],["Buffalo Sabres","Detroit Red Wings"],["Mighty Ducks of Anaheim","San Jose Sharks"],["Philadelphia Flyers","Tampa Bay Lightning"],["Pittsburgh Penguins","Winnipeg Jets"],["Calgary Flames","Washington Capitals"]],
        ["1994-03-07",["Washington Capitals","Boston Bruins"],["Quebec Nordiques","New Jersey Devils"],["Detroit Red Wings","New York Rangers"],["St. Louis Blues","Toronto Maple Leafs"],["Florida Panthers","Vancouver Canucks"],["New York Islanders","Winnipeg Jets"]],
        ["1994-03-08",["Mighty Ducks of Anaheim","Chicago Blackhawks"],["Dallas Stars","Philadelphia Flyers"],["Boston Bruins","Pittsburgh Penguins"],["Ottawa Senators","Quebec Nordiques"],["Buffalo Sabres","San Jose Sharks"]],
        ["1994-03-09",["Detroit Red Wings","Calgary Flames"],["Florida Panthers","Edmonton Oilers"],["Tampa Bay Lightning","Hartford Whalers"],["Chicago Blackhawks","Los Angeles Kings"],["Buffalo Sabres","Mighty Ducks of Anaheim"],["St. Louis Blues","Montreal Canadiens"],["Dallas Stars","Toronto Maple Leafs"],["New York Islanders","Vancouver Canucks"],["New York Rangers","Washington Capitals"]],
        ["1994-03-10",["New York Rangers","Boston Bruins"],["Hartford Whalers","New Jersey Devils"],["Ottawa Senators","Philadelphia Flyers"],["Toronto Maple Leafs","Pittsburgh Penguins"],["Montreal Canadiens","Quebec Nordiques"],["New York Islanders","San Jose Sharks"]],
        ["1994-03-11",["Florida Panthers","Calgary Flames"],["Detroit Red Wings","Edmonton Oilers"],["Chicago Blackhawks","Mighty Ducks of Anaheim"],["Vancouver Canucks","Winnipeg Jets"]],
        ["1994-03-12",["San Jose Sharks","Calgary Flames"],["Dallas Stars","Hartford Whalers"],["Buffalo Sabres","Los Angeles Kings"],["Philadelphia Flyers","Montreal Canadiens"],["Boston Bruins","New Jersey Devils"],["New York Rangers","Pittsburgh Penguins"],["New York Islanders","St. Louis Blues"],["Winnipeg Jets","Toronto Maple Leafs"],["Quebec Nordiques","Washington Capitals"]],
        ["1994-03-13",["Vancouver Canucks","Chicago Blackhawks"],["Pittsburgh Penguins","Hartford Whalers"],["Ottawa Senators","Mighty Ducks of Anaheim"],["Dallas Stars","New Jersey Devils"],["Tampa Bay Lightning","Philadelphia Flyers"]],
        ["1994-03-14",["New York Rangers","Florida Panthers"],["Boston Bruins","Montreal Canadiens"],["Chicago Blackhawks","Quebec Nordiques"]],
        ["1994-03-15",["Vancouver Canucks","Detroit Red Wings"],["Ottawa Senators","Los Angeles Kings"],["New Jersey Devils","New York Islanders"],["Washington Capitals","Pittsburgh Penguins"],["Calgary Flames","Tampa Bay Lightning"]],
        ["1994-03-16",["Calgary Flames","Florida Panthers"],["Los Angeles Kings","Mighty Ducks of Anaheim"],["Chicago Blackhawks","Montreal Canadiens"],["Hartford Whalers","New York Rangers"],["Edmonton Oilers","Tampa Bay Lightning"],["Vancouver Canucks","Toronto Maple Leafs"],["St. Louis Blues","Winnipeg Jets"]],
        ["1994-03-17",["Pittsburgh Penguins","Boston Bruins"],["New Jersey Devils","Buffalo Sabres"],["New York Islanders","Detroit Red Wings"],["Hartford Whalers","Quebec Nordiques"],["Ottawa Senators","San Jose Sharks"]],
        ["1994-03-18",["Washington Capitals","Dallas Stars"],["Edmonton Oilers","Florida Panthers"],["Buffalo Sabres","New York Islanders"],["Chicago Blackhawks","New York Rangers"],["St. Louis Blues","Toronto Maple Leafs"]],
        ["1994-03-19",["New Jersey Devils","Boston Bruins"],["San Jose Sharks","Los Angeles Kings"],["Quebec Nordiques","Montreal Canadiens"],["Hartford Whalers","Philadelphia Flyers"],["Vancouver Canucks","Pittsburgh Penguins"],["Detroit Red Wings","Winnipeg Jets"]],
        ["1994-03-20",["Ottawa Senators","Buffalo Sabres"],["St. Louis Blues","Chicago Blackhawks"],["Vancouver Canucks","Dallas Stars"],["Philadelphia Flyers","Florida Panthers"],["Pittsburgh Penguins","New York Islanders"],["Edmonton Oilers","Quebec Nordiques"],["Los Angeles Kings","San Jose Sharks"],["Washington Capitals","Tampa Bay Lightning"],["Calgary Flames","Toronto Maple Leafs"]],
        ["1994-03-21",["New Jersey Devils","Florida Panthers"]],
        ["1994-03-22",["New York Rangers","Calgary Flames"],["Mighty Ducks of Anaheim","Dallas Stars"],["Chicago Blackhawks","Detroit Red Wings"],["Tampa Bay Lightning","New York Islanders"],["San Jose Sharks","Pittsburgh Penguins"],["Boston Bruins","Quebec Nordiques"],["Philadelphia Flyers","St. Louis Blues"],["Hartford Whalers","Washington Capitals"]],
        ["1994-03-23",["St. Louis Blues","Buffalo Sabres"],["New York Rangers","Edmonton Oilers"],["Toronto Maple Leafs","Florida Panthers"],["Vancouver Canucks","Los Angeles Kings"],["Detroit Red Wings","Ottawa Senators"],["Montreal Canadiens","Winnipeg Jets"]],
        ["1994-03-24",["Mighty Ducks of Anaheim","Boston Bruins"],["Montreal Canadiens","Chicago Blackhawks"],["Tampa Bay Lightning","New Jersey Devils"],["Florida Panthers","Philadelphia Flyers"],["Ottawa Senators","Pittsburgh Penguins"],["San Jose Sharks","Toronto Maple Leafs"]],
        ["1994-03-25",["Hartford Whalers","Buffalo Sabres"],["Washington Capitals","Detroit Red Wings"],["Los Angeles Kings","Edmonton Oilers"],["Dallas Stars","St. Louis Blues"],["New York Rangers","Vancouver Canucks"],["San Jose Sharks","Winnipeg Jets"]],
        ["1994-03-26",["Montreal Canadiens","Boston Bruins"],["Pittsburgh Penguins","Calgary Flames"],["Mighty Ducks of Anaheim","Hartford Whalers"],["Philadelphia Flyers","New Jersey Devils"],["Florida Panthers","New York Islanders"],["Quebec Nordiques","Toronto Maple Leafs"]],
        ["1994-03-27",["New York Islanders","Buffalo Sabres"],["Detroit Red Wings","Chicago Blackhawks"],["Pittsburgh Penguins","Edmonton Oilers"],["Quebec Nordiques","New Jersey Devils"],["Mighty Ducks of Anaheim","Philadelphia Flyers"],["San Jose Sharks","St. Louis Blues"],["Dallas Stars","Tampa Bay Lightning"],["Los Angeles Kings","Vancouver Canucks"],["New York Rangers","Winnipeg Jets"],["Boston Bruins","Washington Capitals"]],
        ["1994-03-28",["Dallas Stars","Florida Panthers"],["Ottawa Senators","Montreal Canadiens"],["Toronto Maple Leafs","Vancouver Canucks"]],
        ["1994-03-29",["Hartford Whalers","Detroit Red Wings"],["Montreal Canadiens","New Jersey Devils"],["New York Rangers","Philadelphia Flyers"],["Winnipeg Jets","San Jose Sharks"],["New York Islanders","Washington Capitals"]],
        ["1994-03-30",["Tampa Bay Lightning","Buffalo Sabres"],["St. Louis Blues","Florida Panthers"],["Chicago Blackhawks","Hartford Whalers"],["Mighty Ducks of Anaheim","Los Angeles Kings"],["Quebec Nordiques","Ottawa Senators"],["Pittsburgh Penguins","Vancouver Canucks"]],
        ["1994-03-31",["Dallas Stars","Boston Bruins"],["Washington Capitals","Chicago Blackhawks"],["Quebec Nordiques","Detroit Red Wings"],["Edmonton Oilers","Mighty Ducks of Anaheim"],["Calgary Flames","Philadelphia Flyers"],["Toronto Maple Leafs","San Jose Sharks"]],
        // April 1994
        ["1994-04-01",["Boston Bruins","Buffalo Sabres"],["Montreal Canadiens","New York Islanders"],["Dallas Stars","New York Rangers"],["St. Louis Blues","Tampa Bay Lightning"],["Winnipeg Jets","Vancouver Canucks"],["New Jersey Devils","Washington Capitals"]],
        ["1994-04-02",["Calgary Flames","Detroit Red Wings"],["Ottawa Senators","Florida Panthers"],["Philadelphia Flyers","Hartford Whalers"],["Edmonton Oilers","Los Angeles Kings"],["Toronto Maple Leafs","Mighty Ducks of Anaheim"],["New York Islanders","Montreal Canadiens"],["New York Rangers","New Jersey Devils"],["Buffalo Sabres","Quebec Nordiques"],["Vancouver Canucks","San Jose Sharks"]],
        ["1994-04-03",["Calgary Flames","Chicago Blackhawks"],["St. Louis Blues","Detroit Red Wings"],["Edmonton Oilers","Los Angeles Kings"],["Boston Bruins","Pittsburgh Penguins"],["Dallas Stars","Washington Capitals"]],
        ["1994-04-04",["Florida Panthers","New York Rangers"],["Tampa Bay Lightning","Pittsburgh Penguins"],["Buffalo Sabres","Quebec Nordiques"],["Philadelphia Flyers","Winnipeg Jets"]],
        ["1994-04-05",["Toronto Maple Leafs","Dallas Stars"],["San Jose Sharks","Los Angeles Kings"],["Florida Panthers","Quebec Nordiques"],["Chicago Blackhawks","St. Louis Blues"],["Detroit Red Wings","Vancouver Canucks"],["New York Islanders","Washington Capitals"]],
        ["1994-04-06",["Mighty Ducks of Anaheim","Calgary Flames"],["New York Islanders","Hartford Whalers"],["Tampa Bay Lightning","Montreal Canadiens"],["Washington Capitals","Ottawa Senators"],["New Jersey Devils","Pittsburgh Penguins"],["Edmonton Oilers","Winnipeg Jets"]],
        ["1994-04-07",["Ottawa Senators","Boston Bruins"],["Florida Panthers","Philadelphia Flyers"],["Hartford Whalers","Quebec Nordiques"],["Los Angeles Kings","St. Louis Blues"],["San Jose Sharks","Vancouver Canucks"]],
        ["1994-04-08",["Montreal Canadiens","Buffalo Sabres"],["San Jose Sharks","Calgary Flames"],["St. Louis Blues","Chicago Blackhawks"],["Mighty Ducks of Anaheim","Edmonton Oilers"],["Pittsburgh Penguins","New Jersey Devils"],["Dallas Stars","New York Islanders"],["Toronto Maple Leafs","New York Rangers"]],
        ["1994-04-09",["Tampa Bay Lightning","Boston Bruins"],["Detroit Red Wings","Calgary Flames"],["Pittsburgh Penguins","Montreal Canadiens"],["Mighty Ducks of Anaheim","Vancouver Canucks"],["Los Angeles Kings","Winnipeg Jets"],["Ottawa Senators","Washington Capitals"]],
        ["1994-04-10",["Quebec Nordiques","Buffalo Sabres"],["Los Angeles Kings","Chicago Blackhawks"],["Detroit Red Wings","Edmonton Oilers"],["New Jersey Devils","Florida Panthers"],["Tampa Bay Lightning","Hartford Whalers"],["New York Rangers","New York Islanders"],["Boston Bruins","Philadelphia Flyers"],["Vancouver Canucks","San Jose Sharks"],["Dallas Stars","St. Louis Blues"],["Winnipeg Jets","Toronto Maple Leafs"]],
        ["1994-04-11",["Montreal Canadiens","Hartford Whalers"],["Calgary Flames","Mighty Ducks of Anaheim"],["Pittsburgh Penguins","Ottawa Senators"]],
        ["1994-04-12",["St. Louis Blues","Dallas Stars"],["Quebec Nordiques","Florida Panthers"],["Buffalo Sabres","New York Rangers"],["New Jersey Devils","Philadelphia Flyers"],["Chicago Blackhawks","Toronto Maple Leafs"],["Winnipeg Jets","Washington Capitals"]],
        ["1994-04-13",["Montreal Canadiens","Detroit Red Wings"],["Calgary Flames","Los Angeles Kings"],["Vancouver Canucks","Mighty Ducks of Anaheim"],["Boston Bruins","Ottawa Senators"],["Edmonton Oilers","San Jose Sharks"],["New York Islanders","Tampa Bay Lightning"]],
        ["1994-04-14",["Hartford Whalers","Boston Bruins"],["Washington Capitals","Buffalo Sabres"],["Toronto Maple Leafs","Chicago Blackhawks"],["Detroit Red Wings","Dallas Stars"],["New York Islanders","Florida Panthers"],["Edmonton Oilers","Los Angeles Kings"],["Ottawa Senators","New Jersey Devils"],["Philadelphia Flyers","New York Rangers"],["Winnipeg Jets","St. Louis Blues"],["Quebec Nordiques","Tampa Bay Lightning"]]
    ];
    
    allGames = [];
    scheduleData.forEach(dayData => {
        const dateStr = dayData[0];
        const games = dayData.slice(1);
        
        games.forEach(game => {
            allGames.push({
                date: new Date(dateStr),
                visitor: game[0],
                home: game[1],
                played: false
            });
        });
    });
}

function renderTeamSelection() {
    const teamGrid = document.getElementById('teamGrid');
    teamGrid.innerHTML = '';
    
    Object.keys(teams).forEach(teamName => {
        const teamCard = document.createElement('div');
        teamCard.className = 'team-card';
        teamCard.innerHTML = `
            <h3>${teamName}</h3>
            <p>${teams[teamName].division} Division</p>
            <p>${teams[teamName].conference} Conference</p>
        `;
        teamCard.onclick = () => selectTeam(teamName, teamCard);
        teamGrid.appendChild(teamCard);
    });
}

function selectTeam(teamName, cardElement) {
    selectedTeam = teamName;
    
    document.querySelectorAll('.team-card').forEach(card => {
        card.classList.remove('selected');
    });
    cardElement.classList.add('selected');
    
    document.getElementById('startSeason').disabled = false;
}

function startSeason() {
    if (!selectedTeam) return;
    
    hideAllScreens();
    document.getElementById('gameScreen').classList.add('active');
    
    updateTeamInfo();
    updateCurrentDate();
    showGamesToday();
    updateNavigationButtons();
}

function updateTeamInfo() {
    const teamInfo = document.getElementById('teamInfo');
    const stats = teamStats[selectedTeam];
    
    teamInfo.innerHTML = `
        <h4>${selectedTeam}</h4>
        <p><strong>Record:</strong> ${stats.wins}-${stats.losses}-${stats.ties}</p>
        <p><strong>Points:</strong> ${stats.points}</p>
        <p><strong>GF:</strong> ${stats.goalsFor}</p>
        <p><strong>GA:</strong> ${stats.goalsAgainst}</p>
    `;
}

function updateCurrentDate() {
    const dateStr = currentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('currentDate').textContent = dateStr;
}

function showGamesToday() {
    let gamesToday = [];
    let container = document.getElementById('gamesToday');
    container.innerHTML = '';
    
    gamesToday = allGames.filter(game => 
        game.date.toDateString() === currentDate.toDateString()
    );
    
    if (gamesToday.length === 0) {
        container.innerHTML = '<p>No games today</p>';
        return;
    }

    const allMyGamesPlayed = allGames.filter(game => game.visitor === selectedTeam || game.home === selectedTeam).every(game => game.played);
    
    gamesToday.forEach((game, index) => {
        const gameDiv = document.createElement('div');
        gameDiv.className = 'game-item';
        
        const isUserGame = game.visitor === selectedTeam || game.home === selectedTeam;
        if (isUserGame) {
            gameDiv.classList.add('user-game');
        }
        
        if (game.played) {
            gameDiv.innerHTML = `
                <div><strong>${game.visitor}</strong> @ <strong>${game.home}</strong></div>
                <div>Final: ${game.visitorScore} - ${game.homeScore}</div>
            `;
        } else if (isUserGame && !allMyGamesPlayed) {
            gameDiv.innerHTML = `
                <div><strong>${game.visitor}</strong> @ <strong>${game.home}</strong></div>
                <div>
                    <input type="number" class="score-input" id="regular-visitor-${index}" min="0" max="20" placeholder="0">
                    -
                    <input type="number" class="score-input" id="regular-home-${index}" min="0" max="20" placeholder="0">
                    <button class="btn" onclick="submitGameWrapper('regular', ${index})">Submit</button>
                    <button class="btn" onclick="simulateMyGame('${game.visitor}', '${game.home}')">Simulate My Game</button>
                </div>
            `;
        } else {
            gameDiv.innerHTML = `
                <div><strong>${game.visitor}</strong> @ <strong>${game.home}</strong></div>
                <div><em>Will be simulated</em></div>
            `;
        }
        
        container.appendChild(gameDiv);
    });
}

function submitGameWrapper(type, index) {
    const gamesToday = allGames.filter(game => 
        game.date.toDateString() === currentDate.toDateString()
    );
    const game = gamesToday[index];
    const visitorScore = parseInt(document.getElementById(`${type}-visitor-${index}`).value) || 0;
    const homeScore = parseInt(document.getElementById(`${type}-home-${index}`).value) || 0;

    const userTeamName = selectedTeam;
    const opponentTeamName = game.visitor === userTeamName ? game.home : game.visitor;
    const userTeamScore = game.visitor === userTeamName ? visitorScore : homeScore;
    const opponentTeamScore = game.visitor === userTeamName ? homeScore : visitorScore;
    
    showPlayerStatsModal(game, userTeamScore, opponentTeamScore, userTeamName, opponentTeamName);
}

function updateTeamStats(visitor, home, visitorScore, homeScore) {
    const visitorStats = teamStats[visitor];
    const homeStats = teamStats[home];
    
    visitorStats.goalsFor += visitorScore;
    visitorStats.goalsAgainst += homeScore;
    homeStats.goalsFor += homeScore;
    homeStats.goalsAgainst += visitorScore;
    
    if (visitorScore > homeScore) {
        visitorStats.wins++;
        visitorStats.points += 2;
        homeStats.losses++;
    } else if (homeScore > visitorScore) {
        homeStats.wins++;
        homeStats.points += 2;
        visitorStats.losses++;
    } else {
        visitorStats.ties++;
        homeStats.ties++;
        visitorStats.points += 1;
        homeStats.points += 1;
    }
}

function showPlayerStatsModal(game, userScore, opponentScore, userTeamName, opponentTeamName) {
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
        <div class="player-stats-modal">
            <h3>Game stats: ${game.visitor} @ ${game.home}</h3>
            <div style="display:flex; justify-content: space-around; flex-wrap: wrap; gap: 20px;">
                <div style="flex: 1; min-width: 250px;">
                    <h4>${userTeamName}s stats</h4>
                    <p>Goal: ${userScore}</p>
                    <div id="userGoalInputs"></div>
                    <div id="userPimInputs" style="margin-top: 20px;">
                        <h5>Penalty Minutes</h5>
                    </div>
                </div>
                <div style="flex: 1; min-width: 250px;">
                    <h4>${opponentTeamName}s stats</h4>
                    <p>Goal: ${opponentScore}</p>
                    <div id="opponentGoalInputs"></div>
                    <div id="opponentPimInputs" style="margin-top: 20px;">
                        <h5>Penalty Minutes</h5>
                    </div>
                </div>
            </div>
            
            <div class="modal-buttons">
                <button class="btn" onclick="submitPlayerStatsFromModal(${userScore}, ${opponentScore}, '${userTeamName}', '${opponentTeamName}', '${game.visitor}', '${game.home}', 'regular')">Submit</button>
            </div>
        </div>
    `;
    
    const userGoalInputsDiv = document.getElementById('userGoalInputs');
    const userPimInputsDiv = document.getElementById('userPimInputs');
    const opponentGoalInputsDiv = document.getElementById('opponentGoalInputs');
    const opponentPimInputsDiv = document.getElementById('opponentPimInputs');

    const userSkatingPlayers = players[userTeamName].forwards.concat(players[userTeamName].defensemen).map(p => p.name);
    const opponentSkatingPlayers = players[opponentTeamName].forwards.concat(players[opponentTeamName].defensemen).map(p => p.name);

    // User Team Inputs
    for (let i = 0; i < userScore; i++) {
        const goalEntryDiv = document.createElement('div');
        goalEntryDiv.className = 'goal-entry';
        goalEntryDiv.innerHTML = `
            <p>Goal ${i + 1}:</p>
            <div class="player-input-row">
                <span>Scorer:</span>
                <select id="user-goal-scorer-${i}">
                    ${userSkatingPlayers.map(p => `<option>${p}</option>`).join('')}
                </select>
            </div>
            <div class="player-input-row">
                <span>Assist 1:</span>
                <select id="user-assist1-${i}">
                    <option value="">None</option>
                    ${userSkatingPlayers.map(p => `<option>${p}</option>`).join('')}
                </select>
            </div>
            <div class="player-input-row">
                <span>Assist 2:</span>
                <select id="user-assist2-${i}">
                    <option value="">None</option>
                    ${userSkatingPlayers.map(p => `<option>${p}</option>`).join('')}
                </select>
            </div>
        `;
        userGoalInputsDiv.appendChild(goalEntryDiv);
    }

    Object.values(players[userTeamName]).flat().map(p => p.name).forEach(player => {
        const pimEntryDiv = document.createElement('div');
        pimEntryDiv.className = 'player-input-row';
        pimEntryDiv.innerHTML = `
            <span>${player}:</span>
            <input type="number" id="user-pim-${player}" min="0" value="0">
        `;
        userPimInputsDiv.appendChild(pimEntryDiv);
    });
    
    // Opponent Team Inputs
    for (let i = 0; i < opponentScore; i++) {
        const goalEntryDiv = document.createElement('div');
        goalEntryDiv.className = 'goal-entry';
        goalEntryDiv.innerHTML = `
            <p>Goal ${i + 1}:</p>
            <div class="player-input-row">
                <span>Scorer:</span>
                <select id="opponent-goal-scorer-${i}">
                    ${opponentSkatingPlayers.map(p => `<option>${p}</option>`).join('')}
                </select>
            </div>
            <div class="player-input-row">
                <span>Assist 1:</span>
                <select id="opponent-assist1-${i}">
                    <option value="">None</option>
                    ${opponentSkatingPlayers.map(p => `<option>${p}</option>`).join('')}
                </select>
            </div>
            <div class="player-input-row">
                <span>Assist 2:</span>
                <select id="opponent-assist2-${i}">
                    <option value="">None</option>
                    ${opponentSkatingPlayers.map(p => `<option>${p}</option>`).join('')}
                </select>
            </div>
        `;
        opponentGoalInputsDiv.appendChild(goalEntryDiv);
    }

    Object.values(players[opponentTeamName]).flat().map(p => p.name).forEach(player => {
        const pimEntryDiv = document.createElement('div');
        pimEntryDiv.className = 'player-input-row';
        pimEntryDiv.innerHTML = `
            <span>${player}:</span>
            <input type="number" id="opponent-pim-${player}" min="0" value="0">
        `;
        opponentPimInputsDiv.appendChild(pimEntryDiv);
    });

    const modal = document.getElementById('modal');
    modal.classList.add('show');
}

function submitPlayerStatsFromModal(userScore, opponentScore, userTeamName, opponentTeamName, visitorTeam, homeTeam, seriesId) {
    const userPlayerStats = {};
    Object.values(players[userTeamName]).flat().map(p => p.name).forEach(player => {
        userPlayerStats[player] = { goals: 0, assists: 0, pim: 0 };
    });

    const opponentPlayerStats = {};
    Object.values(players[opponentTeamName]).flat().map(p => p.name).forEach(player => {
        opponentPlayerStats[player] = { goals: 0, assists: 0, pim: 0 };
    });
    
    // Collect user stats from the modal form
    for (let i = 0; i < userScore; i++) {
        const scorer = document.getElementById(`user-goal-scorer-${i}`).value;
        const assist1 = document.getElementById(`user-assist1-${i}`).value;
        const assist2 = document.getElementById(`user-assist2-${i}`).value;

        if (scorer) {
            userPlayerStats[scorer].goals++;
            if (assist1 && assist1 !== scorer) userPlayerStats[assist1].assists++;
            if (assist2 && assist2 !== scorer && assist2 !== assist1) userPlayerStats[assist2].assists++;
        }
    }

    Object.values(players[userTeamName]).flat().map(p => p.name).forEach(player => {
        const pim = parseInt(document.getElementById(`user-pim-${player}`).value) || 0;
        userPlayerStats[player].pim = pim;
    });
    
    // Collect opponent stats from the modal form
    for (let i = 0; i < opponentScore; i++) {
        const scorer = document.getElementById(`opponent-goal-scorer-${i}`).value;
        const assist1 = document.getElementById(`opponent-assist1-${i}`).value;
        const assist2 = document.getElementById(`opponent-assist2-${i}`).value;

        if (scorer) {
            opponentPlayerStats[scorer].goals++;
            if (assist1 && assist1 !== scorer) opponentPlayerStats[assist1].assists++;
            if (assist2 && assist2 !== scorer && assist2 !== assist1) opponentPlayerStats[assist2].assists++;
        }
    }

    Object.values(players[opponentTeamName]).flat().map(p => p.name).forEach(player => {
        const pim = parseInt(document.getElementById(`opponent-pim-${player}`).value) || 0;
        opponentPlayerStats[player].pim = pim;
    });
    
    // Find the correct game to update
    const gamesToday = allGames.filter(g => g.date.toDateString() === currentDate.toDateString());
    const game = gamesToday.find(g => 
        (g.home === homeTeam && g.visitor === visitorTeam) || 
        (g.home === visitorTeam && g.visitor === homeTeam)
    );

    if (game) {
        game.played = true;
        game.visitorScore = (game.visitor === userTeamName) ? userScore : opponentScore;
        game.homeScore = (game.home === userTeamName) ? userScore : opponentScore;
        
        updateTeamStats(game.visitor, game.home, game.visitorScore, game.homeScore);
        updatePlayerStatsForGame(userTeamName, userPlayerStats);
        updatePlayerStatsForGame(opponentTeamName, opponentPlayerStats);
        
    } else {
        console.error("Game object not found for submitted stats.");
    }

    closeModal();
    
    // Simulate all other games for the current date and update the UI.
    const gamesToSimulate = allGames.filter(g => g.date.toDateString() === currentDate.toDateString() && !g.played);
    gamesToSimulate.forEach(g => simulateRealisticGame(g));

    showGamesToday();
    updateTeamInfo();
    updateNavigationButtons();
}
function updatePlayerStatsForGame(teamName, playerStats) {
     Object.keys(playerStats).forEach(player => {
        if (teamStats[teamName].playerStats[player]) {
            teamStats[teamName].playerStats[player].gp++;
            teamStats[teamName].playerStats[player].goals += playerStats[player].goals;
            teamStats[teamName].playerStats[player].assists += playerStats[player].assists;
            teamStats[teamName].playerStats[player].points += playerStats[player].goals + playerStats[player].assists;
            teamStats[teamName].playerStats[player].pim += playerStats[player].pim;
        }
    });
}

function getPlayerFromTeam(teamName, playerName) {
    const allPlayers = players[teamName].forwards.concat(players[teamName].defensemen).concat(players[teamName].goalies);
    return allPlayers.find(p => p.name === playerName);
}

function generatePlayerStats(teamName, goals) {
    const allPlayers = players[teamName].forwards.concat(players[teamName].defensemen).concat(players[teamName].goalies);
    const skaters = players[teamName].forwards.concat(players[teamName].defensemen);
    const goalies = players[teamName].goalies.map(p => p.name);

    const playerStats = {};
    allPlayers.forEach(player => {
        playerStats[player.name] = { goals: 0, assists: 0, pim: 0 };
    });

    const topPlayersOnTeam = skaters.sort((a, b) => b.rating - a.rating).slice(0, 5);

 const scorerPool = [];
    skaters.forEach(player => {
        let weightedRating = player.rating;
        
        const isDefenseman = players[teamName].defensemen.some(d => d.name === player.name);
        const isAllStar = allStars.includes(player.name);
        const top50GoalsIndex = top50Goals.indexOf(player.name);
        const isTop50GoalScorer = top50GoalsIndex !== -1;
        const isEnforcer = enforcers.includes(player.name);

        const isEliteAllStar = eliteAllStars.includes(player.name);

        if (isDefenseman) {
            if (isEliteAllStar) {
                weightedRating *= 1.2;
            } else if (isAllStar) {
                weightedRating *= 1.0;
            } else if (isTop50GoalScorer) {
                weightedRating *= 1.0;
            } else {
                weightedRating *= 0.5;
            }
        } else if (isEliteAllStar) {
            weightedRating *= 3.3; // The new top-tier buff
        } else if (isAllStar) {
            weightedRating *= 2.0;
        } else if (isTop50GoalScorer) {
            const rank = top50GoalsIndex + 1;
            if (rank <= 10) {
                weightedRating *= 2.1;
            } else if (rank <= 30) {
                weightedRating *= 1.5;
            } else {
                weightedRating *= 1.3;
            }
        } else if (isEnforcer) {
            weightedRating *= 0.1;
        } else {
            weightedRating *= 1.3;
        }
        
        for (let i = 0; i < weightedRating; i++) {
            scorerPool.push(player.name);
        }
    });

    const assisterPool = [];
    skaters.forEach(player => {
        let weightedRating = player.rating;
        
        const isAllStar = allStars.includes(player.name);
        const top50AssistsIndex = top50Assists.indexOf(player.name);
        const isTop50Assist = top50AssistsIndex !== -1;
        const isEnforcer = enforcers.includes(player.name);

      if (isAllStar) {
            weightedRating *= 4.0; // Top All-Stars get a big buff here too
        } else if (isEnforcer) {
            weightedRating *= 0.15;
        } else if (isTop50Assist) {
             const rank = top50AssistsIndex + 1;
            if (rank <= 10) {
                 weightedRating *= 2.5; // New: Top-10 playmakers get a bigger buff
            } else {
                 weightedRating *= (0.5 + (50 - rank) / 50);
            }
        } else {
             if (players[teamName].forwards.map(f => f.name).includes(player.name)) {
                weightedRating *= 1.1; 
            } else {
                weightedRating *= 0.8;
            }
        }
        
        for (let i = 0; i < weightedRating; i++) {
            assisterPool.push(player.name);
        }
    });
    
    // Iterate through each goal and assign a scorer and up to two assists.
    for (let i = 0; i < goals; i++) {
        // Find a scorer from the scorerPool.
        const randomScorerIndex = Math.floor(Math.random() * scorerPool.length);
        const scorer = scorerPool[randomScorerIndex];
        playerStats[scorer].goals++;
        
        const assignedAssists = new Set();
        let potentialAssisters = assisterPool.filter(p => p !== scorer);
        
        // Assign first assist (if there are potential assisters)
        if (potentialAssisters.length > 0 && Math.random() < 0.85) {
            const firstAssister = potentialAssisters[Math.floor(Math.random() * potentialAssisters.length)];
            
            if (firstAssister) {
                playerStats[firstAssister].assists++;
                assignedAssists.add(firstAssister);
            }
        }

        // Assign second assist (if a first assist was given)
        if (assignedAssists.size > 0 && Math.random() < 0.5) {
            let potentialAssisters2 = potentialAssisters.filter(p => !assignedAssists.has(p));
            
            if (potentialAssisters2.length > 0) {
                const secondAssister = potentialAssisters2[Math.floor(Math.random() * potentialAssisters2.length)];
                
                if (secondAssister) {
                   playerStats[secondAssister].assists++;
                }
            }
        }
    }
    
    allPlayers.forEach(player => {
        const isSkater = !goalies.includes(player.name);
        const isTopPlayer = top50Goals.includes(player.name);
        const isEnforcer = enforcers.includes(player.name);
        
        if (isSkater) {
            let pimChance = 0.1;
            if (isEnforcer) {
                 if (player.name === 'Tie Domi' || player.name === 'Bob Probert') {
                    pimChance = 1.0; 
                 } else {
                    pimChance = 0.75; 
                 }
            } else if (isTopPlayer) {
                pimChance = 0.05;
            }
            
            if (Math.random() < pimChance) {
                if (isEnforcer) {
                    playerStats[player.name].pim = Math.floor(Math.random() * 2) * 2 + 2; 
                } else {
                    playerStats[player.name].pim = Math.floor(Math.random() * 2) + 2;
                }
            }
        } else {
            if (Math.random() < 0.02) {
                playerStats[player.name].pim = 2;
            }
        }
    });

    return playerStats;
}

function renderLeagueLeaders() {
    let allPlayers = [];
    const filter = currentFilter;

    if (filter === 'league') {
        Object.keys(teams).forEach(teamName => {
            Object.keys(teamStats[teamName].playerStats).forEach(playerName => {
                const stats = teamStats[teamName].playerStats[playerName];
                allPlayers.push({ player: playerName, team: teamName, ...stats });
            });
        });
    } else if (filter === 'eastern' || filter === 'western') {
        Object.keys(teams).filter(t => teams[t].conference.toLowerCase() === filter).forEach(teamName => {
            Object.keys(teamStats[teamName].playerStats).forEach(playerName => {
                const stats = teamStats[teamName].playerStats[playerName];
                allPlayers.push({ player: playerName, team: teamName, ...stats });
            });
        });
    } else if (filter === 'team' && selectedTeam) {
         Object.keys(teamStats[selectedTeam].playerStats).forEach(playerName => {
            const stats = teamStats[selectedTeam].playerStats[playerName];
            allPlayers.push({ player: playerName, team: selectedTeam, ...stats });
        });
    } else {
        const teamsInDivision = Object.keys(teams).filter(t => teams[t].division.toLowerCase() === filter);
        teamsInDivision.forEach(teamName => {
            Object.keys(teamStats[teamName].playerStats).forEach(playerName => {
                const stats = teamStats[teamName].playerStats[playerName];
                allPlayers.push({ player: playerName, team: teamName, ...stats });
            });
            });
    }
    
    const sortedPlayers = allPlayers.sort((a, b) => {
        const sortOrder = sortDirection === 'desc' ? -1 : 1;
        let comparison = 0;
        
        if (currentSortColumn === 'points') {
            if (b.points !== a.points) comparison = b.points - a.points;
            else if (b.goals !== a.goals) comparison = b.goals - a.goals;
            else comparison = b.assists - a.assists;
        } else {
            comparison = (b[currentSortColumn] - a[currentSortColumn]);
        }
        
        return comparison * sortOrder;
    });

    let title = 'League Leaders';
    if (currentFilter === 'eastern' || currentFilter === 'western') {
         title = `${teams[Object.keys(teams).find(t => teams[t].conference.toLowerCase() === currentFilter)]?.conference} ledare`;
    } else if (currentFilter === 'team' && selectedTeam) {
         title = `${selectedTeam} spelarstatistik`;
    } else if (currentFilter !== 'league') {
         const divisionName = currentFilter.charAt(0).toUpperCase() + currentFilter.slice(1);
         title = `${divisionName} divisionens ledare`;
    }
    
    document.querySelectorAll('.player-stats-filters button').forEach(button => {
        button.classList.remove('active');
    });
    const activeFilterButton = document.getElementById(`filter-${currentFilter}`);
    if (activeFilterButton) {
        activeFilterButton.classList.add('active');
    }


    let tableHTML = `
        <h3 style="text-align: center; margin-bottom: 20px;">${title}</h3>
        <table class="player-stats-table">
            <thead>
                <tr>
                    <th>Spelare</th>
                    <th>Lag</th>
                    <th onclick="showLeagueLeaders(currentFilter, 'gp', sortDirection === 'asc' ? 'desc' : 'asc')">GP</th>
                    <th onclick="showLeagueLeaders(currentFilter, 'goals', sortDirection === 'asc' ? 'desc' : 'asc')">M</th>
                    <th onclick="showLeagueLeaders(currentFilter, 'assists', sortDirection === 'asc' ? 'desc' : 'asc')">A</th>
                    <th onclick="showLeagueLeaders(currentFilter, 'points', sortDirection === 'asc' ? 'desc' : 'asc')">P</th>
                    <th onclick="showLeagueLeaders(currentFilter, 'pim', sortDirection === 'asc' ? 'desc' : 'asc')">PIM</th>
                </tr>
            </thead>
            <tbody>
    `;

    sortedPlayers.forEach(player => {
        tableHTML += `
            <tr>
                <td>${player.player}</td>
                <td>${player.team}</td>
                <td>${player.gp}</td>
                <td>${player.goals}</td>
                <td>${player.assists}</td>
                <td>${player.points}</td>
                <td>${player.pim}</td>
            </tr>
        `;
    });

    tableHTML += `
            </tbody>
        </table>
    `;

    document.getElementById('playerStatsTable').innerHTML = tableHTML;
}

function previousDate() {
    let prevDate = null;
    let prevGameDate = null;
    for (let i = allGames.length - 1; i >= 0; i--) {
        if (allGames[i].date.getTime() < currentDate.getTime()) {
            prevGameDate = allGames[i].date;
            break;
        }
    }
    prevDate = prevGameDate;

    if (prevDate) {
        currentDate = new Date(prevDate);
        updateCurrentDate();
        showGamesToday();
        updateNavigationButtons();
    }
}

function nextDate() {
    // Check if there are any unplayed games for the user's team on the current day.
    const userGameToday = allGames.find(g => 
        g.date.toDateString() === currentDate.toDateString() &&
        !g.played &&
        (g.visitor === selectedTeam || g.home === selectedTeam)
    );

    if (userGameToday) {
        showModal('Vänligen fyll i resultatet för din match innan du går vidare.');
        return;
    }

    // Simulate all other games for the current day.
    const gamesToSimulate = allGames.filter(g => g.date.toDateString() === currentDate.toDateString() && !g.played);
    gamesToSimulate.forEach(g => simulateRealisticGame(g));
    
    // Check if the season is over after simulation
    if (allGames.every(game => game.played)) {
        isSeasonOver = true;
    }

    // Find the next game date to advance.
    const nextGameDate = allGames.find(game => game.date.getTime() > currentDate.getTime())?.date;

    if (nextGameDate) {
        currentDate = new Date(nextGameDate);
        updateCurrentDate();
        showGamesToday();
        updateTeamInfo();
    } else {
        // If no more games are left after today, show the Season Over screen.
        currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
        showSeasonOverScreen();
        return;
    }
    updateNavigationButtons();
}
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevDateBtn');
    const nextBtn = document.getElementById('nextDateBtn');
    
 
    
    // Disable Next Date button if there are pending games for the user's team
    const userGameToday = allGames.find(g => 
        g.date.toDateString() === currentDate.toDateString() &&
        !g.played &&
        (g.visitor === selectedTeam || g.home === selectedTeam)
    );

    if (userGameToday) {
        nextBtn.disabled = true;
    } else {
        nextBtn.disabled = false;
    }
    
    // Enable Previous Date button if there are past games
    const firstGameDate = allGames[0].date;
    prevBtn.disabled = currentDate.getTime() <= firstGameDate.getTime();
}
function saveGame() {
  try {
    const gameState = {
      selectedTeam,
      currentDate: currentDate.toISOString(),
      teamStats,
      allGames,
      playoffState,
      playoffView,
      playoffCurrentDate: playoffCurrentDate ? playoffCurrentDate.toISOString() : null,
      savedAt: new Date().toISOString()
    };
    const json = JSON.stringify(gameState);
    window.nhl94SaveData = json;
    // optional persistence across reloads
    try { localStorage.setItem('nhl94SaveData', json); } catch (_) {}
    showModal('Game Saved!');
  } catch (error) {
    showModal('Game could not be saved: ' + error.message);
  }
}

function exportSave() {
  try {
    const savedData = window.nhl94SaveData || (typeof localStorage !== 'undefined' && localStorage.getItem('nhl94SaveData'));
    if (!savedData) { showModal('No saved data found. Save your game before exporting'); return; }
    const gameState = JSON.parse(savedData);
    const saveDate = new Date().toISOString().split('T')[0];
    const teamName = (gameState.selectedTeam || 'TEAM').replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
    const fileName = `NHL94_${teamName}_${saveDate}.json`;

    const blob = new Blob([savedData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showModal('Save file exported!');
  } catch (error) {
    showModal('Something went wrong: ' + error.message);
  }
}

function triggerImport() {
  const input = document.getElementById('importFile');
  if (!input) { console.error('Import file input element not found.'); return; }
  input.value = '';         // ensure onchange fires even if same file is chosen
  input.click();
}

function importSave(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const text = e.target.result;
      const data = JSON.parse(text);
      if (!data.selectedTeam || !data.currentDate || !data.teamStats || !data.allGames) {
        throw new Error('Ogiltigt sparfilsformat');
      }
      window.nhl94SaveData = text;
      try { localStorage.setItem('nhl94SaveData', text); } catch (_) {}
      const btn = document.getElementById('continueBtn');
      if (btn) btn.disabled = false;
      showModal('Sparfilen importerades framgångsrikt! Välj ”Continue Game”.');
    } catch (err) {
      showModal('Ogiltig sparfil: ' + err.message);
    }
  };
  reader.readAsText(file);
}

function continueGame() {
  try {
    const savedData = window.nhl94SaveData || (typeof localStorage !== 'undefined' && localStorage.getItem('nhl94SaveData'));
    if (!savedData) { showModal('Inget sparat spel hittades!'); return; }
    const gameState = JSON.parse(savedData);

    selectedTeam = gameState.selectedTeam;
    currentDate  = new Date(gameState.currentDate);
    teamStats    = gameState.teamStats;
    playoffState = gameState.playoffState || null;
    playoffView  = gameState.playoffView || 'calendar';
    playoffCurrentDate = gameState.playoffCurrentDate ? new Date(gameState.playoffCurrentDate) : null;

    // Recalculate avgRating for all teams (fix for NaN bug)
    Object.keys(teams).forEach(teamName => {
        if (!teams[teamName].avgRating) {
            const totalRating = Object.values(players[teamName]).flat().reduce((sum, player) => sum + player.rating, 0);
            const numPlayers = Object.values(players[teamName]).flat().length;
            teams[teamName].avgRating = totalRating / numPlayers;
        }
    });

    // ✅ reconstruct games and restore Date objects
    allGames = gameState.allGames.map(g => ({
      ...g,
      date: new Date(g.date)
    }));

    if (playoffState) {
      showPlayoffScreen();
    } else {
      hideAllScreens();
      document.getElementById('gameScreen').classList.add('active');
      updateTeamInfo();
      updateCurrentDate();
      showGamesToday();
      updateNavigationButtons();
    }
  } catch (error) {
    showModal('Det gick inte att ladda spelet: ' + error.message);
  }
}

function checkSavedGame() {
  const cont = document.getElementById('continueBtn');
  if (!cont) return;
  const has = (typeof window !== 'undefined' && window.nhl94SaveData)
           || (typeof localStorage !== 'undefined' && localStorage.getItem('nhl94SaveData'));
  cont.disabled = !has;
}
function showStandings() {
    hideAllScreens();
    document.getElementById('standingsScreen').classList.add('active');
    showStandingsBy('league');
}

function showStandingsBy(filter) {
    let teamsToShow = [];
    let title = '';
    
    switch(filter) {
        case 'league':
            teamsToShow = Object.keys(teams);
            title = 'Standings';
            break;
        case 'eastern':
            teamsToShow = Object.keys(teams).filter(team => teams[team].conference === 'Eastern');
            title = 'Eastern Conference Standings';
            break;
        case 'western':
            teamsToShow = Object.keys(teams).filter(team => teams[team].conference === 'Western');
            title = 'Western Conference Standings';
            break;
        case 'atlantic':
            teamsToShow = Object.keys(teams).filter(team => teams[team].division === 'Atlantic');
            title = 'Atlantic Division Standings';
            break;
     case 'northeast':
    teamsToShow = Object.keys(teams).filter(team => teams[team].division === 'Northeast');
    title = 'Northeast Division Standings';
    break;
case 'central':
    teamsToShow = Object.keys(teams).filter(team => teams[team].division === 'Central');
    title = 'Central Division Standings';
    break;
case 'pacific':
    teamsToShow = Object.keys(teams).filter(team => teams[team].division === 'Pacific');
    title = 'Pacific Division Standings';
    break;
    }
     document.querySelectorAll('#standingsScreen .btn').forEach(button => {
        button.classList.remove('active');
    });
    const activeButton = document.getElementById(`filter-${filter}`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
    teamsToShow.sort((a, b) => {
        const aStats = teamStats[a];
        const bStats = teamStats[b];
        
        if (bStats.points !== aStats.points) {
            return bStats.points - aStats.points;
        }
        if (bStats.wins !== aStats.wins) {
            return bStats.wins - aStats.wins;
        }
        return (bStats.goalsFor - bStats.goalsAgainst) - (aStats.goalsFor - aStats.goalsAgainst);
    });
    
    let tableHTML = `
        <h3 style="text-align: center; margin-bottom: 20px;">${title}</h3>
        <table class="standings-table">
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Lag</th>
                    <th>GP</th>
                    <th>W</th>
                    <th>L</th>
                    <th>T</th>
                    <th>PTS</th>
                    <th>GF</th>
                    <th>GA</th>
                    <th>+/-</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    teamsToShow.forEach((team, index) => {
        const stats = teamStats[team];
        const gamesPlayed = stats.wins + stats.losses + stats.ties;
        const goalDiff = stats.goalsFor - stats.goalsAgainst;
        const rowClass = team === selectedTeam ? 'user-team-row' : '';
        
        tableHTML += `
            <tr class="${rowClass}">
                <td>${index + 1}</td>
                <td>${team}</td>
                <td>${gamesPlayed}</td>
                <td>${stats.wins}</td>
                <td>${stats.losses}</td>
                <td>${stats.ties}</td>
                <td>${stats.points}</td>
                <td>${stats.goalsFor}</td>
                <td>${stats.goalsAgainst}</td>
                <td>${goalDiff >= 0 ? '+' : ''}${goalDiff}</td>
            </tr>
        `;
    });
    
    tableHTML += `
            </tbody>
        </table>
    `;

    document.getElementById('standingsTable').innerHTML = tableHTML;
}

window.addEventListener('load', function() {
    checkSavedGame();
});

function simulateRealisticGame(game) {
    // Safety check to prevent NaN scores
    if (!teams[game.visitor] || !teams[game.home]) {
        console.error('Invalid teams in game:', game);
        return;
    }
    
    let visitorRating = teams[game.visitor].avgRating || 65;
    let homeRating = teams[game.home].avgRating || 65;

    // Add a more significant home-ice advantage
    const homeIceAdvantage = 10;
    homeRating += homeIceAdvantage;
    
    // Add a buff to the better team to increase their chances of winning
    if (homeRating > visitorRating) {
        homeRating *= 1.1;
    } else {
        visitorRating *= 1.1;
    }

    const totalRating = visitorRating + homeRating;

    let totalGoals = 0;
    // Adjust goal distribution based on team average ratings
    const avgRatingLeague = Object.values(teams).reduce((sum, team) => sum + team.avgRating, 0) / Object.keys(teams).length;
    const combinedRating = visitorRating + homeRating;
    const ratingRatio = combinedRating / (avgRatingLeague * 2);
    
    // Adjust probabilities for goal count based on rating ratio
    let r = Math.random();
    if (r < 0.02) totalGoals = 2;
    else if (r < 0.10) totalGoals = 3;
    else if (r < 0.30) totalGoals = 4;
    else if (r < 0.55) totalGoals = 5;
    else if (r < 0.75) totalGoals = 6;
    else if (r < 0.90) totalGoals = 7;
    else totalGoals = Math.floor(Math.random() * 3) + 8;
    
    totalGoals = Math.round(totalGoals * ratingRatio);
    if (totalGoals < 2) totalGoals = 2;


    let visitorGoals = 0;
    let homeGoals = 0;
    
    const isTie = Math.random() < 0.15;
    
    if (isTie) {
        // Ensure the number of goals is even for a tie
        if (totalGoals % 2 !== 0) {
            totalGoals++;
        }
        visitorGoals = totalGoals / 2;
        homeGoals = totalGoals / 2;
    } else {
        // Simulate a game with a winner
        for (let i = 0; i < totalGoals; i++) {
            if (Math.random() < (visitorRating / totalRating)) {
                visitorGoals++;
            } else {
                homeGoals++;
            }
        }
        
        // If the score is tied, break the tie by adding one goal
        if (visitorGoals === homeGoals) {
            if (Math.random() < 0.5) {
                visitorGoals++;
            } else {
                homeGoals++;
            }
        }
    }

    game.played = true;
    game.visitorScore = visitorGoals;
    game.homeScore = homeGoals;
    
    updateTeamStats(game.visitor, game.home, visitorGoals, homeGoals);
    const visitorStats = generatePlayerStats(game.visitor, game.visitorScore);
    const homeStats = generatePlayerStats(game.home, game.homeScore);
    updatePlayerStatsForGame(game.visitor, visitorStats);
    updatePlayerStatsForGame(game.home, homeStats);

}
// ─── PLAYOFFS ────────────────────────────────────────────────────────────────

let playoffState = null;
let playoffView = 'calendar'; // 'bracket' or 'calendar'
let playoffCurrentDate = null;

function getPlayoffSeeds() {
    // Top 8 from each conference, sorted by points then wins
    const conferences = ['Eastern', 'Western'];
    const seeds = {};
    conferences.forEach(conf => {
        const confTeams = Object.keys(teams).filter(t => teams[t].conference === conf);
        confTeams.sort((a, b) => {
            const as = teamStats[a], bs = teamStats[b];
            if (bs.points !== as.points) return bs.points - as.points;
            if (bs.wins !== as.wins) return bs.wins - as.wins;
            return (bs.goalsFor - bs.goalsAgainst) - (as.goalsFor - as.goalsAgainst);
        });
        seeds[conf] = confTeams.slice(0, 8);
    });
    return seeds;
}

function buildFirstRound(seeds) {
    // 1v8, 2v7, 3v6, 4v5 per conference
    const matchups = [];
    ['Eastern', 'Western'].forEach(conf => {
        const s = seeds[conf];
        [[0,7],[1,6],[2,5],[3,4]].forEach(([hi, lo]) => {
            matchups.push({ conf, high: s[hi], low: s[lo], highSeed: hi+1, lowSeed: lo+1 });
        });
    });
    return matchups;
}

function createSeries(team1, team2, conf) {
    return {
        team1, team2, conf,
        wins1: 0, wins2: 0,
        games: [],
        winner: null
    };
}

function initPlayoffs() {
    const seeds = getPlayoffSeeds();
    const firstRoundMatchups = buildFirstRound(seeds);

    Object.keys(teams).forEach(team => {
        if (!teamStats[team].playoffStats) {
            teamStats[team].playoffStats = {};
            Object.values(players[team]).flat().forEach(p => {
                teamStats[team].playoffStats[p.name] = { goals: 0, assists: 0, points: 0, pim: 0, gp: 0 };
            });
        }
    });

    const round1Series = firstRoundMatchups.map(m => createSeries(m.high, m.low, m.conf));

    playoffState = {
        seeds,
        rounds: [round1Series],
        champion: null,
        calendar: [] // playoff game days
    };

    generatePlayoffCalendar();
    playoffCurrentDate = playoffState.calendar[0]?.date || new Date('1994-04-18');
    playoffView = 'calendar';
    showPlayoffScreen();
}

function showPlayoffScreen() {
    hideAllScreens();
    document.getElementById('playoffScreen').classList.add('active');
    renderPlayoffView();
}

function renderPlayoffView() {
    if (playoffView === 'bracket') {
        document.getElementById('playoffBracket').style.display = 'block';
        document.getElementById('playoffCalendar').style.display = 'none';
        document.getElementById('btnViewBracket').classList.add('active');
        document.getElementById('btnViewCalendar').classList.remove('active');
        renderPlayoffBracket();
    } else {
        document.getElementById('playoffBracket').style.display = 'none';
        document.getElementById('playoffCalendar').style.display = 'block';
        document.getElementById('btnViewCalendar').classList.add('active');
        document.getElementById('btnViewBracket').classList.remove('active');
        renderPlayoffCalendarView();
    }
}

function switchPlayoffView(view) {
    playoffView = view;
    renderPlayoffView();
}

// ─── PLAYOFF CALENDAR ────────────────────────────────────────────────────────

function generatePlayoffCalendar() {
    const roundStartDates = [
        new Date('1994-04-18'),
        new Date('1994-05-02'),
        new Date('1994-05-16'),
        new Date('1994-05-26')
    ];

    playoffState.calendar = [];
    addRoundToCalendar(0, roundStartDates[0]);
}

function addRoundToCalendar(roundIdx, startDate) {
    const round = playoffState.rounds[roundIdx];
    if (!round) return;
    for (let gameNum = 0; gameNum < 7; gameNum++) {
        const gameDate = new Date(startDate);
        gameDate.setDate(startDate.getDate() + gameNum * 2);
        round.forEach(series => {
            playoffState.calendar.push({
                date: gameDate,
                series,
                gameNum,
                played: false
            });
        });
    }
    playoffState.calendar.sort((a, b) => a.date - b.date);
}

function rebuildCalendarForNewRound() {
    const roundStartDates = [
        new Date('1994-04-18'),
        new Date('1994-05-02'),
        new Date('1994-05-16'),
        new Date('1994-05-26')
    ];
    const newRoundIdx = playoffState.rounds.length - 1;
    addRoundToCalendar(newRoundIdx, roundStartDates[newRoundIdx]);
    // Jump to first unplayed game of the new round
    const next = playoffState.calendar.find(e =>
        !e.played && !e.series.winner &&
        playoffState.rounds[newRoundIdx].includes(e.series)
    );
    if (next) playoffCurrentDate = next.date;
}

function getCalendarDates() {
    const dates = [];
    const seen = new Set();
    // Only include dates that have at least one relevant entry:
    // either a game that was played, or a game that is next to be played in its series
    playoffState.calendar.forEach(e => {
        const relevant = e.played || (!e.series.winner && e.gameNum === e.series.games.length);
        if (!relevant) return;
        const key = e.date.toDateString();
        if (!seen.has(key)) { seen.add(key); dates.push(e.date); }
    });
    return dates.sort((a, b) => a - b);
}

function renderPlayoffCalendarView() {
    const container = document.getElementById('playoffCalendar');
    if (!container || !playoffState) return;

    const dateStr = playoffCurrentDate.toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    const todayEntries = playoffState.calendar.filter(
        e => e.date.toDateString() === playoffCurrentDate.toDateString()
    );

    // Entries to show: played ones + next unplayed game per active series
    const shownEntries = todayEntries.filter(e => {
        if (e.played) return true;
        if (e.series.winner) return false;
        return e.gameNum === e.series.games.length;
    });

    const allDates = getCalendarDates();
    const currentIdx = allDates.findIndex(d => d.toDateString() === playoffCurrentDate.toDateString());
    const hasPrev = currentIdx > 0;
    const hasNext = currentIdx < allDates.length - 1;

    // Check if user has unplayed game today
    const userEntryToday = shownEntries.find(
        e => e.series.team1 === selectedTeam || e.series.team2 === selectedTeam
    );
    const allTodayDone = shownEntries.every(e => e.played);

    let html = `<div class="current-date">${dateStr}</div>`;
    html += `<div style="display:flex; gap:10px; margin-bottom:20px; flex-wrap:wrap;">`;
    html += `<button class="btn" onclick="playoffPrevDate()" ${!hasPrev ? 'disabled' : ''}>← Previous Date</button>`;
    html += `<button class="btn" onclick="playoffNextDate()" ${userEntryToday && !userEntryToday.played ? 'disabled' : ''}>Next Date →</button>`;
    html += `</div>`;

    if (playoffState.champion) {
        html += `<div style="text-align:center; padding:20px; background:rgba(255,215,0,0.2); border:2px solid #FFD700; border-radius:10px; margin-bottom:20px;">
            <h2 style="color:#FFD700;">🏆 Stanley Cup Champion: ${playoffState.champion} 🏆</h2></div>`;
    }

    if (shownEntries.length === 0 && !playoffState.champion) {
        html += `<p style="text-align:center; color:#ccc;">No games scheduled today.</p>`;
    }

    const roundNames = ['First Round', 'Conference Semifinals', 'Conference Finals', 'Stanley Cup Final'];

    shownEntries.forEach((entry, idx) => {
        const s = entry.series;
        const isUser = s.team1 === selectedTeam || s.team2 === selectedTeam;
        const roundName = roundNames[playoffState.rounds.indexOf(
            playoffState.rounds.find(r => r.includes(s))
        )] || '';
        const divClass = isUser ? 'game-item user-playoff-game' : 'game-item';

        const homeGames = [0, 1, 4, 6];
        const team1IsHome = homeGames.includes(entry.gameNum);
        const visitor = team1IsHome ? s.team2 : s.team1;
        const home    = team1IsHome ? s.team1 : s.team2;

        // Use snapshot for past games, live state for current/future
        const displayGameNum = entry.snapshot ? entry.snapshot.gameNum + 1 : s.games.length + 1;
        const displayWins1   = entry.snapshot ? entry.snapshot.wins1   : s.wins1;
        const displayWins2   = entry.snapshot ? entry.snapshot.wins2   : s.wins2;

        html += `<div class="${divClass}">`;
        html += `<div><strong>${roundName}</strong> — Game ${displayGameNum} | Series: ${displayWins1}-${displayWins2}</div>`;
        html += `<div><strong>${visitor}</strong> @ <strong>${home}</strong></div>`;

        if (entry.played) {
            const gameIndex = entry.gameNum < s.games.length ? entry.gameNum : s.games.length - 1;
            const last = s.games[gameIndex];
            if (last) html += `<div>Final: ${last.score1} - ${last.score2}</div>`;
            if (s.winner && entry.gameNum === s.games.length - 1) html += `<div style="color:#4CAF50; margin-top:4px;">W: ${abbr(s.winner)}</div>`;
        } else if (isUser) {
            html += `<div style="margin-top:8px;">
                <input type="number" class="score-input" id="pcal-s1-${idx}" min="0" max="20" placeholder="0">
                -
                <input type="number" class="score-input" id="pcal-s2-${idx}" min="0" max="20" placeholder="0">
                <button class="btn" onclick="submitPlayoffCalendarGame(${idx}, '${s.team1}', '${s.team2}')">Submit</button>
                <button class="btn" onclick="simulatePlayoffCalendarGame(${idx}, '${s.team1}', '${s.team2}')">Simulate</button>
            </div>`;
        } else {
            html += `<div><em>Will be simulated</em></div>`;
        }
        html += `</div>`;
    });

    container.innerHTML = html;
}

function getVisibleEntriesForDate(date) {
    return playoffState.calendar.filter(e =>
        e.date.toDateString() === date.toDateString() &&
        !e.series.winner &&
        e.gameNum === e.series.games.length
    );
}

function submitPlayoffCalendarGame(idx, team1, team2) {
    const entries = getVisibleEntriesForDate(playoffCurrentDate);
    const entry = team1
        ? entries.find(e => e.series.team1 === team1 && e.series.team2 === team2)
        : entries[idx];
    if (!entry) return;

    // s1/s2 are visitor/home scores as shown in the UI
    const sVisitor = parseInt(document.getElementById(`pcal-s1-${idx}`)?.value) || 0;
    const sHome    = parseInt(document.getElementById(`pcal-s2-${idx}`)?.value) || 0;
    if (sVisitor === sHome) { showModal('Playoff games cannot end in a tie!'); return; }

    const homeGames = [0, 1, 4, 6];
    const team1IsHome = homeGames.includes(entry.gameNum);
    // Convert to team1/team2 scores for advancePlayoffSeries
    const scoreTeam1 = team1IsHome ? sHome : sVisitor;
    const scoreTeam2 = team1IsHome ? sVisitor : sHome;

    const isUserTeam1 = entry.series.team1 === selectedTeam;
    const oppTeam = isUserTeam1 ? entry.series.team2 : entry.series.team1;

    showPlayoffPlayerStatsModal(entry.series, scoreTeam1, scoreTeam2, selectedTeam, oppTeam, entry.series.team1, entry.series.team2, () => {
        entry.snapshot = { gameNum: entry.gameNum, wins1: entry.series.wins1, wins2: entry.series.wins2 };
        entry.played = true;
        simulateRemainingCalendarGamesToday();
        const newRound = checkAndAdvancePlayoffRound();
        if (!newRound) {}
        renderPlayoffView();
    });
}

function simulatePlayoffCalendarGame(idx, team1, team2) {
    const entries = getVisibleEntriesForDate(playoffCurrentDate);
    const entry = team1
        ? entries.find(e => e.series.team1 === team1 && e.series.team2 === team2)
        : entries[idx];
    if (!entry) return;
    const { score1, score2 } = simulatePlayoffGame(entry.series);
    entry.snapshot = { gameNum: entry.gameNum, wins1: entry.series.wins1, wins2: entry.series.wins2 };
    advancePlayoffSeries(entry.series, score1, score2);
    entry.played = true;
    simulateRemainingCalendarGamesToday();
    const newRound = checkAndAdvancePlayoffRound();
    if (!newRound) {
        // stay on current date
    }
    renderPlayoffView();
}

function simulateRemainingCalendarGamesToday() {
    const entries = getVisibleEntriesForDate(playoffCurrentDate);
    entries.forEach(e => {
        if (!e.played && !e.series.winner &&
            e.series.team1 !== selectedTeam && e.series.team2 !== selectedTeam) {
            const { score1, score2 } = simulatePlayoffGame(e.series);
            e.snapshot = { gameNum: e.gameNum, wins1: e.series.wins1, wins2: e.series.wins2 };
            advancePlayoffSeries(e.series, score1, score2);
            e.played = true;
        }
    });
}

function checkAndAdvancePlayoffRound() {
    const currentRound = playoffState.rounds[playoffState.rounds.length - 1];
    if (!currentRound.every(s => s.winner)) return false;

    const winners = currentRound.map(s => s.winner);
    const roundIdx = playoffState.rounds.length - 1;

    if (roundIdx === 3) {
        playoffState.champion = winners[0];
        return false;
    }

    let nextSeries = [];
    if (roundIdx < 2) {
        const eastWinners = winners.filter((_, i) => currentRound[i].conf === 'Eastern');
        const westWinners = winners.filter((_, i) => currentRound[i].conf === 'Western');
        for (let i = 0; i < eastWinners.length; i += 2)
            nextSeries.push(createSeries(eastWinners[i], eastWinners[i+1], 'Eastern'));
        for (let i = 0; i < westWinners.length; i += 2)
            nextSeries.push(createSeries(westWinners[i], westWinners[i+1], 'Western'));
    } else {
        const eastChamp = winners.find((_, i) => currentRound[i].conf === 'Eastern');
        const westChamp = winners.find((_, i) => currentRound[i].conf === 'Western');
        nextSeries.push(createSeries(eastChamp, westChamp, 'Final'));
    }

    nextSeries.forEach(s => {
        [s.team1, s.team2].forEach(team => {
            if (!teamStats[team].playoffStats) {
                teamStats[team].playoffStats = {};
                Object.values(players[team]).flat().forEach(p => {
                    teamStats[team].playoffStats[p.name] = { goals: 0, assists: 0, points: 0, pim: 0, gp: 0 };
                });
            }
        });
    });

    playoffState.rounds.push(nextSeries);
    rebuildCalendarForNewRound();
    return true; // new round was created, date already updated
}

function playoffPrevDate() {
    const allDates = getCalendarDates();
    const idx = allDates.findIndex(d => d.toDateString() === playoffCurrentDate.toDateString());
    if (idx > 0) { playoffCurrentDate = allDates[idx - 1]; renderPlayoffView(); }
}

function playoffNextDate() {
    const userEntry = getVisibleEntriesForDate(playoffCurrentDate).find(
        e => (e.series.team1 === selectedTeam || e.series.team2 === selectedTeam) && !e.played
    );
    if (userEntry) { showModal('Please submit or simulate your game before advancing.'); return; }

    simulateRemainingCalendarGamesToday();
    const newRound = checkAndAdvancePlayoffRound();
    if (newRound) { renderPlayoffView(); return; } // date already set by rebuildCalendarForNewRound

    const allDates = getCalendarDates();
    const idx = allDates.findIndex(d => d.toDateString() === playoffCurrentDate.toDateString());
    if (idx < allDates.length - 1) {
        playoffCurrentDate = allDates[idx + 1];
    }
    renderPlayoffView();
}

// ─── END PLAYOFF CALENDAR ─────────────────────────────────────────────────────

function getCurrentSeries() {
    // Used only for modal callbacks; find first unfinished series
    if (!playoffState) return null;
    for (const round of playoffState.rounds) {
        for (const s of round) { if (!s.winner) return s; }
    }
    return null;
}

function simulatePlayoffGame(series) {
    const r1 = teams[series.team1].avgRating || 65;
    const r2 = teams[series.team2].avgRating || 65;
    const total = r1 + r2;
    // Generate goals
    let goals = 0;
    const r = Math.random();
    if (r < 0.10) goals = 3;
    else if (r < 0.30) goals = 4;
    else if (r < 0.55) goals = 5;
    else if (r < 0.75) goals = 6;
    else goals = 7;

    let g1 = 0, g2 = 0;
    for (let i = 0; i < goals; i++) {
        if (Math.random() < r1 / total) g1++; else g2++;
    }
    if (g1 === g2) Math.random() < 0.5 ? g1++ : g2++;

    return { score1: g1, score2: g2 };
}

function advancePlayoffSeries(series, score1, score2) {
    series.games.push({ score1, score2 });
    if (score1 > score2) series.wins1++; else series.wins2++;

    // Update team stats
    const fakeGame = { visitor: series.team1, home: series.team2, played: true, visitorScore: score1, homeScore: score2 };
    updateTeamStats(series.team1, series.team2, score1, score2);

    // Generate and update playoff player stats
    const stats1 = generatePlayerStats(series.team1, score1);
    const stats2 = generatePlayerStats(series.team2, score2);
    updatePlayoffPlayerStats(series.team1, stats1);
    updatePlayoffPlayerStats(series.team2, stats2);

    if (series.wins1 === 4) series.winner = series.team1;
    else if (series.wins2 === 4) series.winner = series.team2;
}

function updatePlayoffPlayerStats(teamName, playerStats) {
    Object.keys(playerStats).forEach(player => {
        if (teamStats[teamName].playoffStats && teamStats[teamName].playoffStats[player]) {
            teamStats[teamName].playoffStats[player].gp++;
            teamStats[teamName].playoffStats[player].goals += playerStats[player].goals;
            teamStats[teamName].playoffStats[player].assists += playerStats[player].assists;
            teamStats[teamName].playoffStats[player].points += playerStats[player].goals + playerStats[player].assists;
            teamStats[teamName].playoffStats[player].pim += playerStats[player].pim;
        }
    });
}

function simulateAllSeriesInRound() {
    const round = playoffState.rounds[playoffState.rounds.length - 1];
    round.forEach(series => {
        while (!series.winner) {
            const { score1, score2 } = simulatePlayoffGame(series);
            advancePlayoffSeries(series, score1, score2);
        }
    });
    checkAndAdvancePlayoffRound();
    renderPlayoffView();
}

function showPlayoffPlayerStatsModal(series, score1, score2, userTeamName, oppTeamName, t1, t2, callback) {
    const userScore = userTeamName === t1 ? score1 : score2;
    const oppScore = userTeamName === t1 ? score2 : score1;
    window._playoffStatsCallback = callback || null;
    window._playoffCurrentSeries = series;

    const homeGames = [0, 1, 4, 6];
    const team1IsHome = homeGames.includes(series.games.length); // games.length = gameNum being played
    const visitor = team1IsHome ? t2 : t1;
    const home    = team1IsHome ? t1 : t2;

    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
        <div class="player-stats-modal">
            <h3>Game stats: ${visitor} @ ${home}</h3>
            <div style="display:flex; justify-content: space-around; flex-wrap: wrap; gap: 20px;">
                <div style="flex: 1; min-width: 250px;">
                    <h4>${userTeamName} (${userScore})</h4>
                    <div id="playoff-userGoalInputs"></div>
                    <div id="playoff-userPimInputs" style="margin-top: 20px;"><h5>Penalty Minutes</h5></div>
                </div>
                <div style="flex: 1; min-width: 250px;">
                    <h4>${oppTeamName} (${oppScore})</h4>
                    <div id="playoff-oppGoalInputs"></div>
                    <div id="playoff-oppPimInputs" style="margin-top: 20px;"><h5>Penalty Minutes</h5></div>
                </div>
            </div>
            <div class="modal-buttons">
                <button class="btn" onclick="submitPlayoffPlayerStats(${score1}, ${score2}, '${userTeamName}', '${oppTeamName}', '${t1}', '${t2}')">Submit</button>
            </div>
        </div>
    `;

    const userSkaters = players[userTeamName].forwards.concat(players[userTeamName].defensemen).map(p => p.name);
    const oppSkaters = players[oppTeamName].forwards.concat(players[oppTeamName].defensemen).map(p => p.name);

    const userGoalDiv = document.getElementById('playoff-userGoalInputs');
    const oppGoalDiv = document.getElementById('playoff-oppGoalInputs');
    const userPimDiv = document.getElementById('playoff-userPimInputs');
    const oppPimDiv = document.getElementById('playoff-oppPimInputs');

    for (let i = 0; i < userScore; i++) {
        userGoalDiv.innerHTML += `<div class="goal-entry"><p>Goal ${i+1}:</p>
            <div class="player-input-row"><span>Scorer:</span><select id="pu-scorer-${i}">${userSkaters.map(p=>`<option>${p}</option>`).join('')}</select></div>
            <div class="player-input-row"><span>Assist 1:</span><select id="pu-a1-${i}"><option value="">None</option>${userSkaters.map(p=>`<option>${p}</option>`).join('')}</select></div>
            <div class="player-input-row"><span>Assist 2:</span><select id="pu-a2-${i}"><option value="">None</option>${userSkaters.map(p=>`<option>${p}</option>`).join('')}</select></div>
        </div>`;
    }
    Object.values(players[userTeamName]).flat().forEach(p => {
        userPimDiv.innerHTML += `<div class="player-input-row"><span>${p.name}:</span><input type="number" id="pu-pim-${p.name}" min="0" value="0"></div>`;
    });

    for (let i = 0; i < oppScore; i++) {
        oppGoalDiv.innerHTML += `<div class="goal-entry"><p>Goal ${i+1}:</p>
            <div class="player-input-row"><span>Scorer:</span><select id="po-scorer-${i}">${oppSkaters.map(p=>`<option>${p}</option>`).join('')}</select></div>
            <div class="player-input-row"><span>Assist 1:</span><select id="po-a1-${i}"><option value="">None</option>${oppSkaters.map(p=>`<option>${p}</option>`).join('')}</select></div>
            <div class="player-input-row"><span>Assist 2:</span><select id="po-a2-${i}"><option value="">None</option>${oppSkaters.map(p=>`<option>${p}</option>`).join('')}</select></div>
        </div>`;
    }
    Object.values(players[oppTeamName]).flat().forEach(p => {
        oppPimDiv.innerHTML += `<div class="player-input-row"><span>${p.name}:</span><input type="number" id="po-pim-${p.name}" min="0" value="0"></div>`;
    });

    document.getElementById('modal').classList.add('show');
}

function submitPlayoffPlayerStats(score1, score2, userTeamName, oppTeamName, t1, t2) {
    const userScore = userTeamName === t1 ? score1 : score2;
    const oppScore = userTeamName === t1 ? score2 : score1;

    const userStats = {};
    Object.values(players[userTeamName]).flat().forEach(p => { userStats[p.name] = { goals: 0, assists: 0, pim: 0 }; });
    const oppStats = {};
    Object.values(players[oppTeamName]).flat().forEach(p => { oppStats[p.name] = { goals: 0, assists: 0, pim: 0 }; });

    for (let i = 0; i < userScore; i++) {
        const sc = document.getElementById(`pu-scorer-${i}`)?.value;
        const a1 = document.getElementById(`pu-a1-${i}`)?.value;
        const a2 = document.getElementById(`pu-a2-${i}`)?.value;
        if (sc && userStats[sc]) { userStats[sc].goals++; }
        if (a1 && userStats[a1] && a1 !== sc) userStats[a1].assists++;
        if (a2 && userStats[a2] && a2 !== sc && a2 !== a1) userStats[a2].assists++;
    }
    Object.values(players[userTeamName]).flat().forEach(p => {
        const pim = parseInt(document.getElementById(`pu-pim-${p.name}`)?.value) || 0;
        if (userStats[p.name]) userStats[p.name].pim = pim;
    });

    for (let i = 0; i < oppScore; i++) {
        const sc = document.getElementById(`po-scorer-${i}`)?.value;
        const a1 = document.getElementById(`po-a1-${i}`)?.value;
        const a2 = document.getElementById(`po-a2-${i}`)?.value;
        if (sc && oppStats[sc]) { oppStats[sc].goals++; }
        if (a1 && oppStats[a1] && a1 !== sc) oppStats[a1].assists++;
        if (a2 && oppStats[a2] && a2 !== sc && a2 !== a1) oppStats[a2].assists++;
    }
    Object.values(players[oppTeamName]).flat().forEach(p => {
        const pim = parseInt(document.getElementById(`po-pim-${p.name}`)?.value) || 0;
        if (oppStats[p.name]) oppStats[p.name].pim = pim;
    });

    const series = window._playoffCurrentSeries || getCurrentSeries();
    window._playoffCurrentSeries = null;
    advancePlayoffSeries(series, score1, score2);
    // Override with user-entered stats
    updatePlayoffPlayerStats(userTeamName, userStats);
    updatePlayoffPlayerStats(oppTeamName, oppStats);

    closeModal();
    if (window._playoffStatsCallback) {
        window._playoffStatsCallback();
        window._playoffStatsCallback = null;
    } else {
        renderPlayoffView();
    }
}

function simulatePlayoffGameModal(team1, team2) {
    closeModal();
    const series = getCurrentSeries();
    if (!series) return;
    const { score1, score2 } = simulatePlayoffGame(series);
    advancePlayoffSeries(series, score1, score2);
    renderPlayoffView();
}

function renderPlayoffBracket() {
    if (!playoffState) return;
    const container = document.getElementById('playoffBracket');
    if (!container) return;

    const allRounds = [[], [], [], []];
    playoffState.rounds.forEach((round, ri) => { allRounds[ri] = round; });

    const roundNames = ['First Round', 'Conf. Semifinals', 'Conf. Finals'];

    // Layout: West R1 | West Semis | West Finals | SCF | East Finals | East Semis | East R1
    // 7 columns total
    function colHtml(conf, ri) {
        const round = allRounds[ri];
        const confSeries = round ? round.filter(s => s.conf === conf) : [];
        const slots = [4, 2, 1][ri];
        const label = roundNames[ri];
        let html = `<div class="bracket-col">`;
        html += `<div class="bracket-col-label">${label}</div>`;
        for (let si = 0; si < slots; si++) {
            const s = confSeries[si] || null;
            html += s ? renderSeriesCard(s) : renderTBDCard();
        }
        html += `</div>`;
        return html;
    }

    let html = '';
    if (playoffState.champion) {
        html += `<div style="text-align:center; padding:15px; background:rgba(255,215,0,0.2); border:2px solid #FFD700; border-radius:10px; margin-bottom:20px;">
            <h2 style="color:#FFD700;">🏆 Stanley Cup Champion: ${playoffState.champion} 🏆</h2></div>`;
    }

    html += `<div class="bracket-container">`;

    // Western side (left): R1 outermost, Finals innermost
    html += colHtml('Western', 0);
    html += colHtml('Western', 1);
    html += colHtml('Western', 2);

    // Center: Stanley Cup Final
    const finalSeries = allRounds[3] && allRounds[3][0];
    html += `<div class="bracket-col bracket-col-final">`;
    html += `<div class="bracket-col-label" style="color:#FFD700;">🏆 Stanley Cup Final</div>`;
    html += finalSeries ? renderSeriesCard(finalSeries) : renderTBDCard();
    html += `</div>`;

    // Eastern side (right): Finals innermost, R1 outermost
    html += colHtml('Eastern', 2);
    html += colHtml('Eastern', 1);
    html += colHtml('Eastern', 0);

    html += `</div>`;
    container.innerHTML = html;
}

function renderTBDCard() {
    return `<div class="matchup">
        <div class="team bracket-team" style="color:#555;">TBD</div>
        <div class="series-score">- : -</div>
        <div class="team bracket-team" style="color:#555;">TBD</div>
    </div>`;
}

function renderSeriesCard(series) {
    const isUserSeries = series.team1 === selectedTeam || series.team2 === selectedTeam;
    let cls = 'matchup';
    if (isUserSeries) cls += ' user-team';

    const t1cls = series.winner === series.team1 ? 'team bracket-team winner' : (series.winner ? 'team bracket-team eliminated' : 'team bracket-team');
    const t2cls = series.winner === series.team2 ? 'team bracket-team winner' : (series.winner ? 'team bracket-team eliminated' : 'team bracket-team');

    return `<div class="${cls}">
        <div class="${t1cls}">${abbr(series.team1)}</div>
        <div class="series-score">${series.wins1} - ${series.wins2}</div>
        <div class="${t2cls}">${abbr(series.team2)}</div>
    </div>`;
}

function showPlayoffLeaders() {
    hideAllScreens();
    document.getElementById('playoffStatsScreen').classList.add('active');
    renderPlayoffLeaders();
}

function renderPlayoffLeaders() {
    let allPlayers = [];
    // Only include teams that participated in playoffs
    const playoffTeams = new Set();
    if (playoffState) {
        playoffState.rounds.forEach(round => {
            round.forEach(s => { playoffTeams.add(s.team1); playoffTeams.add(s.team2); });
        });
    }

    playoffTeams.forEach(teamName => {
        if (!teamStats[teamName].playoffStats) return;
        Object.keys(teamStats[teamName].playoffStats).forEach(playerName => {
            const stats = teamStats[teamName].playoffStats[playerName];
            if (stats.gp > 0) allPlayers.push({ player: playerName, team: teamName, ...stats });
        });
    });

    allPlayers.sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.goals !== a.goals) return b.goals - a.goals;
        return b.assists - a.assists;
    });

    let html = `<h3 style="text-align:center; margin-bottom:20px;">Playoff Leaders</h3>
        <table class="player-stats-table"><thead><tr>
            <th>Player</th><th>Team</th><th>GP</th><th>G</th><th>A</th><th>P</th><th>PIM</th>
        </tr></thead><tbody>`;
    allPlayers.forEach(p => {
        html += `<tr><td>${p.player}</td><td>${p.team}</td><td>${p.gp}</td><td>${p.goals}</td><td>${p.assists}</td><td>${p.points}</td><td>${p.pim}</td></tr>`;
    });
    html += `</tbody></table>`;
    document.getElementById('playoffStatsTable').innerHTML = html;
}

// ─── END PLAYOFFS ─────────────────────────────────────────────────────────────

function confirmEndSeason() {
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
        <p>Are you sure you want to end the season now and start the playoffs?</p>
        <p style="color:#ccc; font-size:0.9em;">The playoffs will use the current standings.</p>
        <div class="modal-buttons">
            <button class="btn" style="background: linear-gradient(135deg, #e53935, #b71c1c);" onclick="closeModal(); showSeasonOverScreen();">Yes, End Season</button>
            <button class="btn" onclick="closeModal()">Cancel</button>
        </div>
    `;
    document.getElementById('modal').classList.add('show');
}

function showSeasonOverScreen() {
    hideAllScreens();
    document.getElementById('seasonOverScreen').classList.add('active');
}

function saveAndExportFinal() {
    saveGame();
    exportSave();
}
function backToMainMenuOrSeasonOver() {
  // you said you never want the season screen—always go to main menu
  showMainMenu();
}

function simulateMyGame(visitor, home) {
    const game = allGames.find(g => 
        g.date.toDateString() === currentDate.toDateString() &&
        (g.visitor === visitor || g.home === home)
    );
    if (game) {
        simulateRealisticGame(game);
        const gamesToSimulate = allGames.filter(g => g.date.toDateString() === currentDate.toDateString() && !g.played);
        gamesToSimulate.forEach(g => simulateRealisticGame(g));
        showGamesToday();
        updateTeamInfo();
        updateNavigationButtons();
    }
}
// ----------------------------------------------------------------------------------
// The following duplicate functions and trailing brace have been removed for cleanup:
// function backToGame() {...}
// function simulateMyGame(visitor, home) {...}
// function triggerImport() {...}
// }
// ----------------------------------------------------------------------------------
