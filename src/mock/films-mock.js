import dayjs from "dayjs";
const FILM_MOCK_COUNT = 23;

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getTenthsRandomInteger = (a = 0, b = 1) => {
  const num = Math.random() * (a - b) + b;
  return +num.toFixed(1);
};

const generateTitle = () => {
  const titleList = [
    "The Shawshank Redemption",
    "The Godfather",
    "The Godfather: Part II",
    "The Dark Knight",
    "The Lord of the Rings: The Fellowship of the Ring",
    "The Good, the Bad and the Ugly",
    "Schindlers List",
    "12 Angry Men",
    "The Lord of the Rings: The Return of the King",
    "Fight Club",
    "The Lord of the Rings: The Fellowship of the Ring",
    "Star Wars: Episode V - The Empire Strikes Back",
    "Inception",
    "Forrest Gump",
    "One Flew Over the Cuckoos Nest",
    "The Lord of the Rings: The Two Towers",
    "Goodfellas",
    "The Matrix",
    "Star Wars: Episode IV - A New Hope",
    "Seven Samurai",
    "City of God",
    "Se7en",
    "The Usual Suspects",
    "The Silence of the Lambs",
    "Its a Wonderful Life",
    "Once Upon a Time in the West",
    "Léon: The Professional",
    "Life Is Beautiful",
    "Casablanca",
    "The Raiders of the Lost Ark",
    "American History X",
    "Psycho",
    "Rear Window",
    "Saving Private Ryan",
    "City Lights",
    "Spirited Away",
    "The Intouchables",
    "Modern Times",
    "Terminator 2: Judgment Day",
    "Memento",
    "The Pianist",
    "Sunset Blvd.",
    "The Green Mile",
    "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
    "Apocalypse Now",
    "The Departed",
    "Gladiator",
    "Boyhood",
    "Back to the Future",
    "Alien",
    "The Dark Knight Rises",
    "The Prestige",
    "The Lives of Others",
    "Django Unchained",
    "The Great Dictator",
    "The Lion King",
    "The Shining",
    "Cinema Paradiso",
    "American Beauty",
    "Paths of Glory",
    "Guardians of the Galaxy",
    "WALL·E",
    "North by Northwest",
    "Aliens",
    "Amélie",
    "Citizen Kane",
    "Vertigo",
    "Toy Story 3",
    "M",
    "Das Boot",
    "Oldboy",
    "Princess Mononoke",
    "A Clockwork Orange",
    "Taxi Driver",
    "Star Wars: Episode VI - The Return of the Jedi",
    "Grave of the Fireflies",
    "Reservoir Dogs",
    "Double Indemnity",
    "Once Upon a Time in America",
    "Requiem for a Dream",
    "Braveheart",
    "To Kill a Mockingbird",
    "Lawrence of Arabia",
    "Eternal Sunshine of the Spotless Mind",
    "Witness for the Prosecution",
    "Full Metal Jacket",
    "Singin in the Rain",
    "The Sting",
    "Bicycle Thieves",
    "Amadeus",
    "Monty Python and the Holy Grail",
    "Snatch.",
    "L.A. Confidential",
    "All About Eve",
    "Rashomon",
    "The Apartment",
    "For a Few Dollars More",
    "The Treasure of the Sierra Madre",
    "Some Like It Hot",
    "The Third Man",
    "The Kid",
    "Indiana Jones and the Last Crusade",
    "Inglourious Basterds",
    "A Separation",
    "2001: A Space Odyssey",
    "Batman Begins",
    "Yojimbo",
    "Metropolis",
    "Toy Story",
    "Unforgiven",
    "Raging Bull",
    "Scarface",
    "Chinatown",
    "Up",
    "Die Hard",
    "Downfall",
    "The Great Escape",
    "Like Stars on Earth",
    "Mr. Smith Goes to Washington",
    "Pans Labyrinth",
    "On the Waterfront",
    "Heat",
    "The Bridge on the River Kwai",
    "The Hunt",
    "The Wolf of Wall Street",
    "3 Idiots",
    "The Seventh Seal",
    "Good Will Hunting",
    "My Neighbor Totoro",
    "The Elephant Man",
    "Wild Strawberries",
    "The Gold Rush",
    "Ran",
    "Blade Runner",
    "Lock, Stock and Two Smoking Barrels",
    "The General",
    "Ikiru",
    "X-Men: Days of Future Past",
    "Dil Chahta Hai",
    "Gran Torino",
    "The Secret in Their Eyes",
    "The Big Lebowski",
    "Rebecca",
    "Casino",
    "Warrior",
    "V for Vendetta",
    "It Happened One Night",
    "The Deer Hunter",
    "Cool Hand Luke",
    "Rush",
    "Howls Moving Castle",
    "Fargo",
    "How to Train Your Dragon",
    "The Maltese Falcon",
    "Trainspotting",
    "Gone with the Wind",
    "Into the Wild",
    "Judgment at Nuremberg",
    "Colour It Yellow",
    "Hotel Rwanda",
    "12 Years a Slave",
    "A Beautiful Mind",
    "The Sixth Sense",
    "Dial M for Murder",
    "The Thing",
    "Butch Cassidy and the Sundance Kid",
    "Kill Bill: Vol. 1",
    "No Country for Old Men",
    "Finding Nemo",
    "Platoon",
    "The Wages of Fear",
    "Mary and Max",
    "The Grand Budapest Hotel",
    "Life of Brian",
    "Sin City",
    "Annie Hall",
    "Network",
    "Touch of Evil",
    "Diabolique",
    "Incendies",
    "The Princess Bride",
    "Stand by Me",
    "There Will Be Blood",
    "Amores Perros",
    "Ben-Hur",
    "The Wizard of Oz",
    "The Avengers",
    "Million Dollar Baby",
    "The Grapes of Wrath",
    "The 400 Blows",
    "Hachi: A Dogs Tale",
    "In the Name of the Father",
    "The Best Years of Our Lives",
    "The Bourne Ultimatum",
    "Donnie Darko",
    "Strangers on a Train",
    "Persona",
    "Gandhi",
    "8½",
    "Nausicaä of the Valley of the Wind",
    "Jaws",
    "High Noon",
    "Infernal Affairs",
    "The Kings Speech",
    "Twelve Monkeys",
    "Notorious",
    "The Terminator",
    "Stalker",
    "Harry Potter and the Deathly Hallows: Part 2",
    "Shutter Island",
    "Ip Man",
    "Groundhog Day",
    "Fanny and Alexander",
    "Rocky",
    "The Night of the Hunter",
    "Before Sunrise",
    "Dog Day Afternoon",
    "The Road",
    "Lagaan: Once Upon a Time in India",
    "Pirates of the Caribbean: The Curse of the Black Pearl",
    "Her",
    "Monsters, Inc.",
    "La Haine",
    "Barry Lyndon",
    "Whos Afraid of Virginia Woolf?",
    "The Battle of Algiers",
    "The Big Sleep",
    "Memories of Murder",
    "A Fistful of Dollars",
    "Castle in the Sky",
    "The Graduate",
    "How to Train Your Dragon 2",
    "Roman Holiday",
    "The Help",
    "The Truman Show",
    "The Hustler",
    "The Celebration",
    "Jurassic Park",
    "In the Mood for Love",
    "Slumdog Millionaire",
    "Beauty and the Beast",
    "Stalag 17",
    "Rope",
    "A Christmas Story",
    "The Killing",
    "Before Sunset",
    "The Raid 2",
    "Elite Squad: The Enemy Within",
    "Papillon",
    "Swades",
  ];

  const randomIndex = getRandomInteger(0, titleList.length - 1);

  return titleList[randomIndex];
};
const generateDirectors = () => {
  const directorsList = [
    "David Lynch",
    "Stanley Kubrick",
    "Robert Bresson",
    "Alfred Hitchcock",
    "Martin Scorsese",
    "Clint Eastwood",
    "William Wyler",
    "Billy Wilder",
    "John Ford",
    "Fritz Lang",
    "Fred Zinnemann",
    "Sidney Lumet",
    "Francis Ford Coppola",
    "David Fincher",
    "Vittorio De Sica",
    "Sergio Leone",
    "Federico Fellini",
    "Ingmar Bergman",
    "Elia Kazan",
    "John Huston",
    "Theodoros Angelopoulos",
    "Akira Kurosawa",
    "Kar-Wai Wong",
    "Yimou Zhang",
    "Hayao Miyazaki",
    "Kaige Chen",
    "Jean-Pierre Melville",
    "Jean-Pierre Dardenne",
    "Jean-Pierre Jeunet",
    "Jean-Luc Godard",
    "Charles Chaplin",
    "Buster Keaton",
    "Andrei Tarkovsky",
    "Sam Peckinpah",
    "James Cameron",
    "Anthony Minghella",
    "Frank Capra",
    "Orson Welles",
    "Tim Burton",
    "Jim Jarmusch",
    "Roman Polanski",
    "Bernardo Bertolucci",
    "Krzysztof Kieslowski",
    "Sam Mendes",
    "Michael Mann",
    "Ron Howard",
    "Gus Van Sant",
    "Paul Thomas Anderson",
    "Wes Anderson",
    "Frank Darabont",
    "Steven Spielberg",
    "Woody Allen",
    "Quentin Tarantino",
    "Robert Rodriguez",
    "Pedro Almodуvar",
    "Alejandro G. Iсбrritu",
    "Alfonso Cuarуn",
    "Peter Jackson",
    "Mel Brooks",
    "Richard Brooks",
    "Howard Hawks",
    "Blake Edwards",
    "Robert Rossen",
    "Emir Kusturica",
    "Giuseppe Tornatore",
    "Michael Haneke",
    "Tom Tykwer",
    "Christopher Nolan",
    "David Cronenberg",
    "Coen Brothers",
    "Steven Soderbergh",
    "Lars von Trier",
    "Franзois Truffaut",
    "Luis Buсuel",
    "Michelangelo Antonioni",
    "Sydney Pollack",
    "Mike Nichols",
    "Spike Jonze",
    "Jim Sheridan",
    "Michael Curtiz",
    "David Lean",
    "Ridley Scott",
    "Takeshi Kitano",
    "Preston Sturges",
    "Oliver Stone",
    "Milos Forman",
    "Robert Altman",
    "Costa-Gavras",
    "Andrzej Wajda",
    "King Vidor",
    "Carl Theodor Dreyer",
    "F.W. Murnau",
    "D.W. Griffith",
    "Jean Renoir",
    "Rainer Werner Fassbinder",
    "Mel Gibson",
    "Werner Herzog",
    "Brian De Palma",
    "Terry Gilliam",
    "Jafar Panahi",
  ];

  const randomIndex = getRandomInteger(0, directorsList.length - 1);

  return directorsList[randomIndex];
};

const generatePoster = () => {
  const posterList = [
    "made-for-each-other.png",
    "popeye-meets-sinbad.png",
    "sagebrush-trail.jpg",
    "santa-claus-conquers-the-martians.jpg",
    "the-dance-of-life.jpg",
    "the-great-flamarion.jpg",
    "the-man-with-the-golden-arm.jpg",
  ];

  const randomIndex = getRandomInteger(0, posterList.length - 1);

  return `images/posters/${posterList[randomIndex]}`;
};

const generateActors = () => {
  const indianActors = [
    "Aftab Shivdasani",
    "Naseeruddin Shah",
    "Katrina Kaif",
    "Shah Rukh Khan",
    "Rishi Kapoor",
    "Bobby Deol",
    "Rani Mukerji",
    "Vivek Oberoi",
    "Shahid Kapoor",
    "Juhi Chawla",
    "Mithun Chakraborty",
    "Shahid Kapoor",
    "Arbaaz Khan",
    "Lara Dutta",
    "Ranvir Shorey",
    "Akshaye Khanna",
    "Vidya Balan",
    "Manisha Koirala",
    "Riteish Deshmukh",
    "Dino Morea",
    "Sanjay Suri",
    "Aishwarya Rai",
    "Zakir Hussain",
    "Vinay Pathak",
    "Fardeen Khan",
    "Nana Patekar",
    "Sonu Sood",
    "Sonam Kapoor",
    "Anushka Sharma",
    "Mahesh Manjrekar",
    "Sanjay Mishra",
    "Amrita Rao",
    "Ashutosh Rana",
    "Raveena Tandon",
    "Abhay Deol",
    "Konkona Sen Sharma",
    "Celina Jaitly",
    "Rati Agnihotri",
    "Saif Ali Khan",
    "Kay Kay Menon",
    "Sunny Deol",
    "Manoj Bajpayee",
    "Kangana Ranaut",
    "Gulshan Grover",
    "Nawazuddin Siddiqui",
    "Tusshar Kapoor",
    "Anil Kapoor",
    "Govinda",
    "Neha Dhupia",
    "Divya Dutta",
    "Tabu",
    "Sushant Singh",
    "Rajkummar Rao",
    "Shreyas Talpade",
    "Sharman Joshi",
    "Deepika Padukone",
    "Sonakshi Sinha",
    "Hrithik Roshan",
    "Randeep Hooda",
    "Esha Deol",
    "Preity Zinta",
    "Soha Ali Khan",
    "Shakti Kapoor",
    "Sohail Khan",
    "Isha Koppikar",
    "Ravi Kishan",
    "Saurabh Shukla",
    "Amrita Rao",
    "Ashutosh Rana",
    "Ayesha Takia",
    "Ritesh Deshmukh",
    "Mukesh Tiwari",
    "Mukesh Tiwari",
    "Javed Jaffrey",
    "Zayed Khan",
    "Rahul Dev",
  ];
  const actorsList = [];
  const randomCount = getRandomInteger(1, 5);
  for (let i = 0; i < randomCount; i++) {
    const randomIndex = getRandomInteger(0, indianActors.length - 1);
    if (!actorsList.includes(indianActors[randomIndex])) {
      actorsList.push(indianActors[randomIndex]);
    }
  }

  return actorsList;
};

const generateWriters = () => {
  const greatWriters = [
    "William Shakespeare",
    "Emily Dickinson",
    "H. P. Lovecraft",
    "Arthur Conan Doyle",
    "Leo Tolstoy",
    "Edgar Allan Poe",
    "Robert Ervin Howard",
    "Rabindranath Tagore",
    "Rudyard Kipling",
    "Seneca",
    "John Donne",
    "Sarah Williams",
    "Oscar Wilde",
    "Catullus",
    "Alfred Tennyson",
    "William Blake",
    "Charles Dickens",
    "John Keats",
    "Theodor Herzl",
    "Percy Bysshe Shelley",
    "Ernest Hemingway",
    "Barack Obama",
    "Anton Chekhov",
    "Henry Wadsworth Longfellow",
    "Arthur Schopenhauer",
    "Jacob De Haas",
    "George Gordon Byron",
    "Jack London",
    "Robert Frost",
    "Abraham Lincoln",
    "O Henry",
    "Ovid",
    "Robert Louis Stevenson",
    "John Masefield",
    "James Joyce",
    "Clark Ashton Smith",
    "Aristotle",
    "William Wordsworth",
    "Jane Austen",
    "Niccolò Machiavelli",
    "Lewis Carroll",
    "Robert Burns",
    "Edgar Rice Burroughs",
    "Plato",
    "John Milton",
    "Ralph Waldo Emerson",
    "Margaret Thatcher",
    "Sylvie Avigdor",
    "Marcus Tullius Cicero",
    "Banjo Paterson",
    "Woodrow Wilson",
    "Walt Whitman",
    "Theodore Roosevelt",
    "Agatha Christie",
    "Ambrose Bierce",
    "Nikola Tesla",
    "Franz Kafka",
  ];
  const writersList = [];
  const randomCount = getRandomInteger(1, 3);
  for (let i = 0; i < randomCount; i++) {
    const randomIndex = getRandomInteger(0, greatWriters.length - 1);
    if (!writersList.includes(greatWriters[randomIndex])) {
      writersList.push(greatWriters[randomIndex]);
    }
  }

  return writersList;
};

const generateGenre = () => {
  const genres = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Drama",
    "Historical",
    "Horror",
    "Science fiction",
    "Western",
    "Film-Noir",
    "Mystery",
  ];
  const genreList = [];
  const randomCount = getRandomInteger(1, 2);
  for (let i = 0; i < randomCount; i++) {
    const randomIndex = getRandomInteger(0, genres.length - 1);
    if (!genreList.includes(genres[randomIndex])) {
      genreList.push(genres[randomIndex]);
    }
  }

  return genreList;
};

const generateCountry = () => {
  const contryList = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "The Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "The Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea",
    "Kosovo",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Sudan, South",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];

  const randomIndex = getRandomInteger(0, contryList.length - 1);

  return contryList[randomIndex];
};

const generateTotalRating = () => getTenthsRandomInteger(1, 10);

const generateDate = () => {
  const year = getRandomInteger(1896, 2020);
  const month = getRandomInteger(1, 12);
  const day = getRandomInteger(1, 28);

  return dayjs(`${year}-${month}-${day}`);
};

const generateDiscription = () => {
  const mockText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.";
  const mockArray = mockText.split(". ");
  const randomCount = getRandomInteger(1, 5);
  const discriptionArr = [];
  for (let i = 0; i < randomCount; i++) {
    const randomIndex = getRandomInteger(0, mockArray.length - 1);
    discriptionArr.push(mockArray[randomIndex]);
  }
  return discriptionArr.join(". ");
};

const generateRuntime = () => getRandomInteger(60, 180);

const generateAgeRating = () => getRandomInteger(0, 18);

const generateCommentsDate = () => {
  const year = getRandomInteger(2018, 2020);
  let month = getRandomInteger(1, 12);
  let day = getRandomInteger(1, 28);
  let hours = getRandomInteger(0, 23);
  let minutes = getRandomInteger(0, 59);
  let sec = getRandomInteger(0, 59);

  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;
  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  sec = sec < 10 ? `0${sec}` : sec;
  return dayjs(
    `${year}-${month}-${day}T${hours}:${minutes}:${sec}.000Z`
  ).format("YYYY/MM/DD HH:mm");
};

const generateEmotion = () => {
  const emotionList = ["smile", "sleeping", "puke", "angry"];

  const randomIndex = getRandomInteger(0, emotionList.length - 1);

  return emotionList[randomIndex];
};

const generateComment = (index) => ({
  id: index,
  author: generateDirectors(),
  comment: generateDiscription(),
  date: generateCommentsDate(),
  emotion: generateEmotion(),
});

const generateComments = () => {
  const commentsArr = [];
  const count = 50;
  for (let i = 0; i < count; i++) {
    commentsArr.push(generateComment(i));
  }
  return commentsArr;
};

const comments = generateComments();

const generateCommentsList = () => {
  const commentsList = [];
  const randomCount = getRandomInteger(0, 5);
  for (let i = 0; i < randomCount; i++) {
    const randomIndex = getRandomInteger(0, comments.length - 1);
    commentsList.push(comments[randomIndex]);
  }
  return commentsList;
};

const generateFilm = (index) => ({
  id: index,
  comments: generateCommentsList(),
  title: generateTitle(),
  alternativeTitle: generateTitle(),
  totalRating: generateTotalRating(),
  poster: generatePoster(),
  ageRating: generateAgeRating(),
  director: generateDirectors(),
  writers: generateWriters(),
  actors: generateActors(),
  date: generateDate(),
  releaseCountry: generateCountry(),
  runtime: generateRuntime(),
  genre: generateGenre(),
  description: generateDiscription(),
  watchlist: Boolean(getRandomInteger(0, 1)),
  alreadyWatched: Boolean(getRandomInteger(0, 1)),
  watchingDate: generateCommentsDate(),
  favorite: Boolean(getRandomInteger(0, 1)),
});

const generateMocks = (count) => {
  const filmsMockList = [];
  for (let i = 0; i < count; i++) {
    filmsMockList.push(generateFilm(i));
  }
  return filmsMockList;
};

export const getFilms = () => generateMocks(FILM_MOCK_COUNT);
