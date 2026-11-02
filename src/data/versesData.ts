import { Verse } from '../types/verse';

export const VERSES_DATABASE: Verse[] = [
  // --- HOUR 00:00 (Midnight peace) ---
  {
    id: 'psalm-23-1-3',
    book: 'psalms',
    bookName: { en: 'Psalms', zh: '詩篇', fr: 'Psaumes' },
    chapter: 23,
    verse: '1-3',
    reference: {
      en: 'Psalm 23:1-3',
      zh: '詩篇 23:1-3',
      fr: 'Psaume 23:1-3'
    },
    text: {
      en: 'The Lord is my shepherd; I shall not want. He makes me to lie down in green pastures; He leads me beside the still waters. He restores my soul.',
      zh: '耶和華是我的牧者，我必不致缺乏。祂使我躺臥在青草地上，領我在可安歇的水邊。祂使我的靈魂甦醒。',
      fr: "L'Éternel est mon berger: je ne manquerai de rien. Il me fait reposer dans de verts pâturages, Il me dirige près des eaux paisibles. Il restaure mon âme."
    },
    sourceUrl: 'https://www.biblestudytools.com/nkjv/psalms/23.html',
    category: 'peace',
    themeLabel: { en: 'Peace & Rest', zh: '安歇與平安', fr: 'Paix & Repos' },
    defaultHour: 0
  },
  // --- HOUR 01:00 (Proverbs wisdom) ---
  {
    id: 'proverbs-3-5-6',
    book: 'proverbs',
    bookName: { en: 'Proverbs', zh: '箴言', fr: 'Proverbes' },
    chapter: 3,
    verse: '5-6',
    reference: {
      en: 'Proverbs 3:5-6',
      zh: '箴言 3:5-6',
      fr: 'Proverbes 3:5-6'
    },
    text: {
      en: 'Trust in the Lord with all your heart, and lean not on your own understanding; in all your ways acknowledge Him, and He shall direct your paths.',
      zh: '你要專心仰賴耶和華，不可倚靠自己的聰明；在你一切所行的事上都要認定祂，祂必指引你的路。',
      fr: "Confie-toi en l'Éternel de tout ton cœur, et ne t'appuie pas sur ta sagesse; reconnais-le dans toutes tes voies, et il aplanira tes sentiers."
    },
    sourceUrl: 'https://www.biblegateway.com/passage/?search=Proverbs%203%3A5-6&version=NKJV',
    category: 'guidance',
    themeLabel: { en: 'Divine Guidance', zh: '神聖指引', fr: 'Guidance Divine' },
    defaultHour: 1
  },
  // --- HOUR 02:00 (John divine light) ---
  {
    id: 'john-1-1-5',
    book: 'john',
    bookName: { en: 'Gospel of John', zh: '約翰福音', fr: 'Évangile de Jean' },
    chapter: 1,
    verse: '1, 4-5',
    reference: {
      en: 'John 1:1, 4-5',
      zh: '約翰福音 1:1, 4-5',
      fr: 'Jean 1:1, 4-5'
    },
    text: {
      en: 'In the beginning was the Word, and the Word was with God, and the Word was God... In Him was life, and the life was the light of men. And the light shines in the darkness, and the darkness did not comprehend it.',
      zh: '太初有道，道與神同在，道就是神。生命在祂裡頭，這生命就是人的光。光照在黑暗裡，黑暗卻不接受光。',
      fr: "Au commencement était la Parole, et la Parole était avec Dieu, et la Parole était Dieu... En elle était la vie, et la vie était la lumière des hommes. La lumière luit dans les ténèbres, et les ténèbres ne l'ont point reçue."
    },
    sourceUrl: 'https://www.biblestudytools.com/nkjv/john/1.html',
    category: 'light',
    themeLabel: { en: 'The Eternal Light', zh: '永恆真光', fr: 'La Lumière Éternelle' },
    defaultHour: 2
  },
  // --- HOUR 03:00 (Psalms shelter) ---
  {
    id: 'psalm-91-1-2',
    book: 'psalms',
    bookName: { en: 'Psalms', zh: '詩篇', fr: 'Psaumes' },
    chapter: 91,
    verse: '1-2',
    reference: {
      en: 'Psalm 91:1-2',
      zh: '詩篇 91:1-2',
      fr: 'Psaume 91:1-2'
    },
    text: {
      en: 'He who dwells in the secret place of the Most High shall abide under the shadow of the Almighty. I will say of the Lord, "He is my refuge and my fortress; My God, in Him I will trust."',
      zh: '住在至高者隱密處的，必住在全能者的蔭下。我要論到耶和華說：「祂是我的避難所，是我的山寨，是我的神，是我所倚靠的。」',
      fr: "Celui qui demeure sous l'abri du Très-Haut repose à l'ombre du Tout Puissant. Je dis à l'Éternel: Mon refuge et ma forteresse, mon Dieu en qui je me confie!"
    },
    sourceUrl: 'https://www.biblestudytools.com/nkjv/psalms/91.html',
    category: 'comfort',
    themeLabel: { en: 'Secret Refuge', zh: '至高隱密處', fr: 'Refuge Secret' },
    defaultHour: 3
  },
  // --- HOUR 04:00 (Proverbs guard heart) ---
  {
    id: 'proverbs-4-23',
    book: 'proverbs',
    bookName: { en: 'Proverbs', zh: '箴言', fr: 'Proverbes' },
    chapter: 4,
    verse: '23',
    reference: {
      en: 'Proverbs 4:23',
      zh: '箴言 4:23',
      fr: 'Proverbes 4:23'
    },
    text: {
      en: 'Keep your heart with all diligence, for out of it spring the issues of life.',
      zh: '你要保守你心，勝過保守一切，因為一生的果效是由心發出。',
      fr: 'Garde ton cœur plus que toute autre chose, car de lui jaillissent les sources de la vie.'
    },
    sourceUrl: 'https://www.biblegateway.com/passage/?search=Proverbs%204%3A23&version=NKJV',
    category: 'wisdom',
    themeLabel: { en: 'Guarding the Soul', zh: '保守心靈', fr: 'Garder le Cœur' },
    defaultHour: 4
  },
  // --- HOUR 05:00 (Psalms morning joy) ---
  {
    id: 'psalm-143-8',
    book: 'psalms',
    bookName: { en: 'Psalms', zh: '詩篇', fr: 'Psaumes' },
    chapter: 143,
    verse: '8',
    reference: {
      en: 'Psalm 143:8',
      zh: '詩篇 143:8',
      fr: 'Psaume 143:8'
    },
    text: {
      en: 'Cause me to hear Your lovingkindness in the morning, for in You do I trust; cause me to know the way in which I should walk, for I lift up my soul to You.',
      zh: '求你使我清晨得聽你慈愛之言，因我倚靠你；求你使我知道當行的路，因我的心仰望你。',
      fr: "Fais-moi dès le matin entendre ta bonté, car je me confie en toi! Fais-moi connaître le chemin où je dois marcher, car j'élève à toi mon âme!"
    },
    sourceUrl: 'https://www.biblestudytools.com/nkjv/psalms/143.html',
    category: 'guidance',
    themeLabel: { en: 'Morning Grace', zh: '清晨慈愛', fr: 'Grâce du Matin' },
    defaultHour: 5
  },
  // --- HOUR 06:00 (Psalms praise of the day) ---
  {
    id: 'psalm-118-24',
    book: 'psalms',
    bookName: { en: 'Psalms', zh: '詩篇', fr: 'Psaumes' },
    chapter: 118,
    verse: '24',
    reference: {
      en: 'Psalm 118:24',
      zh: '詩篇 118:24',
      fr: 'Psaume 118:24'
    },
    text: {
      en: 'This is the day the Lord has made; we will rejoice and be glad in it.',
      zh: '這是耶和華所定的日子，我們在其中要高興歡喜！',
      fr: "C'est ici la journée que l'Éternel a faite: Qu'elle soit pour nous un sujet d'allégresse et de joie!"
    },
    sourceUrl: 'https://www.biblestudytools.com/nkjv/psalms/118.html',
    category: 'hope',
    themeLabel: { en: 'Rejoice in Today', zh: '今日歡欣', fr: 'Réjouissance du Jour' },
    defaultHour: 6
  },
  // --- HOUR 07:00 (John light of the world) ---
  {
    id: 'john-8-12',
    book: 'john',
    bookName: { en: 'Gospel of John', zh: '約翰福音', fr: 'Évangile de Jean' },
    chapter: 8,
    verse: '12',
    reference: {
      en: 'John 8:12',
      zh: '約翰福音 8:12',
      fr: 'Jean 8:12'
    },
    text: {
      en: 'Then Jesus spoke to them again, saying, "I am the light of the world. He who follows Me shall not walk in darkness, but have the light of life."',
      zh: '耶穌又對眾人說：「我是世上的光。跟從我的，就不在黑暗裡走，必要得著生命的光。」',
      fr: 'Jésus leur parla de nouveau, et dit: "Je suis la lumière du monde; celui qui me suit ne marchera point dans les ténèbres, mais il aura la lumière de la vie."'
    },
    sourceUrl: 'https://www.biblestudytools.com/nkjv/john/8.html',
    category: 'light',
    themeLabel: { en: 'Light of the World', zh: '世界之光', fr: 'Lumière du Monde' },
    defaultHour: 7
  },
  // --- HOUR 08:00 (Proverbs commit your works) ---
  {
    id: 'proverbs-16-3',
    book: 'proverbs',
    bookName: { en: 'Proverbs', zh: '箴言', fr: 'Proverbes' },
    chapter: 16,
    verse: '3',
    reference: {
      en: 'Proverbs 16:3',
      zh: '箴言 16:3',
      fr: 'Proverbes 16:3'
    },
    text: {
      en: 'Commit your works to the Lord, and your thoughts will be established.',
      zh: '你所做的，要交託耶和華，你所謀的，就必成立。',
      fr: "Recommande à l'Éternel tes œuvres, et tes projets réussiront."
    },
    sourceUrl: 'https://www.biblegateway.com/passage/?search=Proverbs%2016%3A3&version=NKJV',
    category: 'wisdom',
    themeLabel: { en: 'Purpose & Commitment', zh: '交託與立定', fr: 'Projets & Foi' },
    defaultHour: 8
  },
  // --- HOUR 09:00 (Psalms strength and shield) ---
  {
    id: 'psalm-28-7',
    book: 'psalms',
    bookName: { en: 'Psalms', zh: '詩篇', fr: 'Psaumes' },
    chapter: 28,
    verse: '7',
    reference: {
      en: 'Psalm 28:7',
      zh: '詩篇 28:7',
      fr: 'Psaume 28:7'
    },
    text: {
      en: 'The Lord is my strength and my shield; my heart trusted in Him, and I am helped; therefore my heart greatly rejoices, and with my song I will praise Him.',
      zh: '耶和華是我的力量，是我的盾牌；我心裡倚靠祂就得幫助。所以我心中歡樂，我必用詩歌頌讚祂。',
      fr: "L'Éternel est ma force et mon bouclier; en lui mon cœur se confie, et je suis secouru; j'ai de l'allégresse dans le cœur, et je le loue par mes chants."
    },
    sourceUrl: 'https://www.biblestudytools.com/nkjv/psalms/28.html',
    category: 'strength',
    themeLabel: { en: 'Strength & Shield', zh: '力量與盾牌', fr: 'Force & Bouclier' },
    defaultHour: 9
  },
  // --- HOUR 10:00 (John the bread of life) ---
  {
    id: 'john-6-35',
    book: 'john',
    bookName: { en: 'Gospel of John', zh: '約翰福音', fr: 'Évangile de Jean' },
    chapter: 6,
    verse: '35',
    reference: {
      en: 'John 6:35',
      zh: '約翰福音 6:35',
      fr: 'Jean 6:35'
    },
    text: {
      en: 'And Jesus said to them, "I am the bread of life. He who comes to Me shall never hunger, and he who believes in Me shall never thirst."',
      zh: '耶穌說：「我就是生命的糧。到我這裡來的，必定不餓；信我的，永遠不渴。」',
      fr: 'Jésus leur dit: "Je suis le pain de vie. Celui qui vient à moi n\'aura jamais faim, et celui qui croit en moi n\'aura jamais soif."'
    },
    sourceUrl: 'https://www.biblestudytools.com/nkjv/john/6.html',
    category: 'faith',
    themeLabel: { en: 'Bread of Life', zh: '生命的糧', fr: 'Pain de Vie' },
    defaultHour: 10
  },
  // --- HOUR 11:00 (Proverbs strong tower) ---
  {
    id: 'proverbs-18-10',
    book: 'proverbs',
    bookName: { en: 'Proverbs', zh: '箴言', fr: 'Proverbes' },
    chapter: 18,
    verse: '10',
    reference: {
      en: 'Proverbs 18:10',
      zh: '箴言 18:10',
      fr: 'Proverbes 18:10'
    },
    text: {
      en: 'The name of the Lord is a strong tower; the righteous run to it and are safe.',
      zh: '耶和華的名是堅固臺；義人奔入便得安穩。',
      fr: "Le nom de l'Éternel est une tour forte; le juste s'y réfugie, et se trouve en sûreté."
    },
    sourceUrl: 'https://www.biblegateway.com/passage/?search=Proverbs%2018%3A10&version=NKJV',
    category: 'strength',
    themeLabel: { en: 'Strong Tower', zh: '堅固堡壘', fr: 'Tour Forte' },
    defaultHour: 11
  },
  // --- HOUR 12:00 (Noon - John love supreme) ---
  {
    id: 'john-3-16',
    book: 'john',
    bookName: { en: 'Gospel of John', zh: '約翰福音', fr: 'Évangile de Jean' },
    chapter: 3,
    verse: '16',
    reference: {
      en: 'John 3:16',
      zh: '約翰福音 3:16',
      fr: 'Jean 3:16'
    },
    text: {
      en: 'For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life.',
      zh: '神愛世人，甚至將祂的獨生子賜給他們，叫一切信祂的，不致滅亡，反得永生。',
      fr: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle."
    },
    sourceUrl: 'https://www.biblestudytools.com/nkjv/john/3.html',
    category: 'love',
    themeLabel: { en: 'Unconditional Love', zh: '無比大愛', fr: 'Amour Infini' },
    defaultHour: 12
  },
  // --- HOUR 13:00 (Psalms lamp to feet) ---
  {
    id: 'psalm-119-105',
    book: 'psalms',
    bookName: { en: 'Psalms', zh: '詩篇', fr: 'Psaumes' },
    chapter: 119,
    verse: '105',
    reference: {
      en: 'Psalm 119:105',
      zh: '詩篇 119:105',
      fr: 'Psaume 119:105'
    },
    text: {
      en: 'Your word is a lamp to my feet and a light to my path.',
      zh: '你的話是我腳前的燈，是我路上的光。',
      fr: 'Ta parole est une lampe à mes pieds, et une lumière sur mon sentier.'
    },
    sourceUrl: 'https://www.biblestudytools.com/nkjv/psalms/119.html',
    category: 'guidance',
    themeLabel: { en: 'Lamp of Truth', zh: '腳前的燈', fr: 'Lampe de Vérité' },
    defaultHour: 13
  },
  // --- HOUR 14:00 (Proverbs cheerful heart) ---
  {
    id: 'proverbs-17-22',
    book: 'proverbs',
    bookName: { en: 'Proverbs', zh: '箴言', fr: 'Proverbes' },
    chapter: 17,
    verse: '22',
    reference: {
      en: 'Proverbs 17:22',
      zh: '箴言 17:22',
      fr: 'Proverbes 17:22'
    },
    text: {
      en: 'A merry heart does good, like medicine, but a broken spirit dries the bones.',
      zh: '喜樂的心乃是良藥；憂傷的靈使骨枯乾。',
      fr: "Un cœur joyeux est un bon remède, mais un esprit abattu dessèche les os."
    },
    sourceUrl: 'https://www.biblegateway.com/passage/?search=Proverbs%2017%3A22&version=NKJV',
    category: 'comfort',
    themeLabel: { en: 'Joy as Medicine', zh: '喜樂良藥', fr: 'Joie Guérissante' },
    defaultHour: 14
  },
  // --- HOUR 15:00 (John abundant life) ---
  {
    id: 'john-10-10',
    book: 'john',
    bookName: { en: 'Gospel of John', zh: '約翰福音', fr: 'Évangile de Jean' },
    chapter: 10,
    verse: '10',
    reference: {
      en: 'John 10:10',
      zh: '約翰福音 10:10',
      fr: 'Jean 10:10'
    },
    text: {
      en: 'The thief does not come except to steal, and to kill, and to destroy. I have come that they may have life, and that they may have it more abundantly.',
      zh: '盜賊來，無非要偷竊、殺害、毀壞；我來了，是要叫羊得生命，並且得的更豐盛。',
      fr: "Le voleur ne vient que pour dérober, égorger et détruire; moi, je suis venu afin que les brebis aient la vie, et qu'elles soient dans l'abondance."
    },
    sourceUrl: 'https://www.biblestudytools.com/nkjv/john/10.html',
    category: 'hope',
    themeLabel: { en: 'Abundant Life', zh: '豐盛生命', fr: 'Vie Abondante' },
    defaultHour: 15
  },
  // --- HOUR 16:00 (Psalms help comes from the Lord) ---
  {
    id: 'psalm-121-1-2',
    book: 'psalms',
    bookName: { en: 'Psalms', zh: '詩篇', fr: 'Psaumes' },
    chapter: 121,
    verse: '1-2',
    reference: {
      en: 'Psalm 121:1-2',
      zh: '詩篇 121:1-2',
      fr: 'Psaume 121:1-2'
    },
    text: {
      en: 'I will lift up my eyes to the hills—from whence comes my help? My help comes from the Lord, who made heaven and earth.',
      zh: '我要向山舉目；我的幫助從何而來？我的幫助從造天地的耶和華而來。',
      fr: "Je lève mes yeux vers les montagnes... D'où me viendra le secours? Le secours me vient de l'Éternel, qui a fait les cieux et la terre."
    },
    sourceUrl: 'https://www.biblestudytools.com/nkjv/psalms/121.html',
    category: 'comfort',
    themeLabel: { en: 'Keeper of Souls', zh: '隨時幫助', fr: 'Secours Éternel' },
    defaultHour: 16
  },
  // --- HOUR 17:00 (Proverbs path of the just) ---
  {
    id: 'proverbs-4-18',
    book: 'proverbs',
    bookName: { en: 'Proverbs', zh: '箴言', fr: 'Proverbes' },
    chapter: 4,
    verse: '18',
    reference: {
      en: 'Proverbs 4:18',
      zh: '箴言 4:18',
      fr: 'Proverbes 4:18'
    },
    text: {
      en: 'But the path of the just is like the shining sun, that shines ever brighter unto the perfect day.',
      zh: '但義人的路好像黎明的光，越照越明，直到日午。',
      fr: "Le sentier des justes est comme la lumière resplendissante, dont l'éclat va croissant jusqu'au milieu du jour."
    },
    sourceUrl: 'https://www.biblegateway.com/passage/?search=Proverbs%204%3A18&version=NKJV',
    category: 'light',
    themeLabel: { en: 'Shining Dawn', zh: '黎明光芒', fr: 'Sentier Lumineux' },
    defaultHour: 17
  },
  // --- HOUR 18:00 (John the true vine) ---
  {
    id: 'john-15-5',
    book: 'john',
    bookName: { en: 'Gospel of John', zh: '約翰福音', fr: 'Évangile de Jean' },
    chapter: 15,
    verse: '5',
    reference: {
      en: 'John 15:5',
      zh: '約翰福音 15:5',
      fr: 'Jean 15:5'
    },
    text: {
      en: 'I am the vine, you are the branches. He who abides in Me, and I in him, bears much fruit; for without Me you can do nothing.',
      zh: '我是葡萄樹，你們是枝子。常在我裡面的，我也常在他裡面，這人就多結果子；因為離了我，你們就不能做什麼。',
      fr: "Je suis le cep, vous êtes les sarments. Celui qui demeure en moi et en qui je demeure porte beaucoup de fruit, car sans moi vous ne pouvez rien faire."
    },
    sourceUrl: 'https://www.biblestudytools.com/nkjv/john/15.html',
    category: 'faith',
    themeLabel: { en: 'The True Vine', zh: '真葡萄樹', fr: 'Le Vrai Cep' },
    defaultHour: 18
  },
  // --- HOUR 19:00 (Psalms taste and see) ---
  {
    id: 'psalm-34-8',
    book: 'psalms',
    bookName: { en: 'Psalms', zh: '詩篇', fr: 'Psaumes' },
    chapter: 34,
    verse: '8',
    reference: {
      en: 'Psalm 34:8',
      zh: '詩篇 34:8',
      fr: 'Psaume 34:8'
    },
    text: {
      en: 'Oh, taste and see that the Lord is good; blessed is the man who trusts in Him!',
      zh: '你們要嘗嘗主恩的滋味，便知道祂是美善；投靠祂的人有福了！',
      fr: "Sentez et voyez combien l'Éternel est bon! Heureux l'homme qui cherche en lui son refuge!"
    },
    sourceUrl: 'https://www.biblestudytools.com/nkjv/psalms/34.html',
    category: 'comfort',
    themeLabel: { en: 'Goodness of God', zh: '主恩美善', fr: 'Bonté de Dieu' },
    defaultHour: 19
  },
  // --- HOUR 20:00 (John peace I give you) ---
  {
    id: 'john-14-27',
    book: 'john',
    bookName: { en: 'Gospel of John', zh: '約翰福音', fr: 'Évangile de Jean' },
    chapter: 14,
    verse: '27',
    reference: {
      en: 'John 14:27',
      zh: '約翰福音 14:27',
      fr: 'Jean 14:27'
    },
    text: {
      en: 'Peace I leave with you, My peace I give to you; not as the world gives do I give to you. Let not your heart be troubled, neither let it be afraid.',
      zh: '我留下平安給你們；我將我的平安賜給你們。我所賜的，不像世人所賜的。你們心裡不要憂愁，也不要膽怯。',
      fr: 'Je vous laisse la paix, je vous donne ma paix. Je ne vous donne pas comme le monde donne. Que votre cœur ne se trouble point, et ne s\'alarme point.'
    },
    sourceUrl: 'https://www.biblestudytools.com/nkjv/john/14.html',
    category: 'peace',
    themeLabel: { en: 'Gift of Peace', zh: '平安的應許', fr: 'Don de Paix' },
    defaultHour: 20
  },
  // --- HOUR 21:00 (Proverbs sweet sleep) ---
  {
    id: 'proverbs-3-24',
    book: 'proverbs',
    bookName: { en: 'Proverbs', zh: '箴言', fr: 'Proverbes' },
    chapter: 3,
    verse: '24',
    reference: {
      en: 'Proverbs 3:24',
      zh: '箴言 3:24',
      fr: 'Proverbes 3:24'
    },
    text: {
      en: 'When you lie down, you will not be afraid; yes, you will lie down and your sleep will be sweet.',
      zh: '你躺下，必不懼怕；你躺臥，睡得香甜。',
      fr: 'Si tu te couches, tu seras sans crainte; et quand tu seras couché, ton sommeil sera doux.'
    },
    sourceUrl: 'https://www.biblegateway.com/passage/?search=Proverbs%203%3A24&version=NKJV',
    category: 'peace',
    themeLabel: { en: 'Sweet Sleep', zh: '香甜睡眠', fr: 'Sommeil Doux' },
    defaultHour: 21
  },
  // --- HOUR 22:00 (Psalms be still and know) ---
  {
    id: 'psalm-46-10',
    book: 'psalms',
    bookName: { en: 'Psalms', zh: '詩篇', fr: 'Psaumes' },
    chapter: 46,
    verse: '10',
    reference: {
      en: 'Psalm 46:10',
      zh: '詩篇 46:10',
      fr: 'Psaume 46:10'
    },
    text: {
      en: 'Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth!',
      zh: '你們要休息，要知道我是神！我必在列國中受尊崇，在全地上也受尊崇。',
      fr: "Arrêtez, et sachez que je suis Dieu: Je domine sur les nations, je domine sur la terre."
    },
    sourceUrl: 'https://www.biblestudytools.com/nkjv/psalms/46.html',
    category: 'peace',
    themeLabel: { en: 'Be Still', zh: '沉靜安息', fr: 'Sois Tranquille' },
    defaultHour: 22
  },
  // --- HOUR 23:00 (Psalms lying down in peace) ---
  {
    id: 'psalm-4-8',
    book: 'psalms',
    bookName: { en: 'Psalms', zh: '詩篇', fr: 'Psaumes' },
    chapter: 4,
    verse: '8',
    reference: {
      en: 'Psalm 4:8',
      zh: '詩篇 4:8',
      fr: 'Psaume 4:8'
    },
    text: {
      en: 'I will both lie down in peace, and sleep; for You alone, O Lord, make me dwell in safety.',
      zh: '我必安然躺下睡覺，因為獨有你——耶和華使我安然居住。',
      fr: 'Je me couche et je m\'endors en paix, car toi seul, ô Éternel! tu me donnes la sécurité dans ma demeure.'
    },
    sourceUrl: 'https://www.biblestudytools.com/nkjv/psalms/4.html',
    category: 'peace',
    themeLabel: { en: 'Night Safety', zh: '夜間安然', fr: 'Sécurité Nocturne' },
    defaultHour: 23
  },
  // --- ADDITIONAL RICH SCRAMBLE REPERTOIRE (Proverbs, Psalms, John) ---
  {
    id: 'john-14-6',
    book: 'john',
    bookName: { en: 'Gospel of John', zh: '約翰福音', fr: 'Évangile de Jean' },
    chapter: 14,
    verse: '6',
    reference: {
      en: 'John 14:6',
      zh: '約翰福音 14:6',
      fr: 'Jean 14:6'
    },
    text: {
      en: 'Jesus said to him, "I am the way, the truth, and the life. No one comes to the Father except through Me."',
      zh: '耶穌說：「我就是道路、真理、生命；若不藉著我，沒有人能到父那裡去。」',
      fr: 'Jésus lui dit: "Je suis le chemin, la vérité, et la vie. Nul ne vient au Père que par moi."'
    },
    sourceUrl: 'https://www.biblestudytools.com/nkjv/john/14.html',
    category: 'truth',
    themeLabel: { en: 'The Way & Truth', zh: '道路與真理', fr: 'Chemin & Vérité' },
    defaultHour: 10
  },
  {
    id: 'psalm-27-1',
    book: 'psalms',
    bookName: { en: 'Psalms', zh: '詩篇', fr: 'Psaumes' },
    chapter: 27,
    verse: '1',
    reference: {
      en: 'Psalm 27:1',
      zh: '詩篇 27:1',
      fr: 'Psaume 27:1'
    },
    text: {
      en: 'The Lord is my light and my salvation; whom shall I fear? The Lord is the strength of my life; of whom shall I be afraid?',
      zh: '耶和華是我的亮光，是我的拯救，我還怕誰呢？耶和華是我性命的保障，我還懼誰呢？',
      fr: "L'Éternel est ma lumière et mon salut: De qui aurais-je crainte? L'Éternel est le soutien de ma vie: De qui aurais-je peur?"
    },
    sourceUrl: 'https://www.biblestudytools.com/nkjv/psalms/27.html',
    category: 'strength',
    themeLabel: { en: 'Fearless Courage', zh: '無懼勇氣', fr: 'Courage Intrépide' },
    defaultHour: 7
  },
  {
    id: 'proverbs-27-17',
    book: 'proverbs',
    bookName: { en: 'Proverbs', zh: '箴言', fr: 'Proverbes' },
    chapter: 27,
    verse: '17',
    reference: {
      en: 'Proverbs 27:17',
      zh: '箴言 27:17',
      fr: 'Proverbes 27:17'
    },
    text: {
      en: 'As iron sharpens iron, so a man sharpens the countenance of his friend.',
      zh: '鐵磨鐵，磨出刃來；朋友相感也是如此。',
      fr: "Comme le fer aiguise le fer, ainsi un homme aiguise la face de son ami."
    },
    sourceUrl: 'https://www.biblegateway.com/passage/?search=Proverbs%2027%3A17&version=NKJV',
    category: 'wisdom',
    themeLabel: { en: 'True Friendship', zh: '良友激勵', fr: 'Amitié Véritable' },
    defaultHour: 15
  },
  {
    id: 'john-16-33',
    book: 'john',
    bookName: { en: 'Gospel of John', zh: '約翰福音', fr: 'Évangile de Jean' },
    chapter: 16,
    verse: '33',
    reference: {
      en: 'John 16:33',
      zh: '約翰福音 16:33',
      fr: 'Jean 16:33'
    },
    text: {
      en: 'These things I have spoken to you, that in Me you may have peace. In the world you will have tribulation; but be of good cheer, I have overcome the world.',
      zh: '我將這些事告訴你們，是要叫你們在我裡面有平安。在世上你們有苦難，但你們可以放心，我已經勝了世界。',
      fr: "Je vous ai dit ces choses, afin que vous ayez la paix en moi. Vous aurez des tribulations dans le monde; mais prenez courage, j'ai vaincu le monde."
    },
    sourceUrl: 'https://www.biblestudytools.com/nkjv/john/16.html',
    category: 'peace',
    themeLabel: { en: 'Overcoming the World', zh: '勝過世界', fr: 'Victoire & Paix' },
    defaultHour: 18
  },
  {
    id: 'psalm-103-1-2',
    book: 'psalms',
    bookName: { en: 'Psalms', zh: '詩篇', fr: 'Psaumes' },
    chapter: 103,
    verse: '1-2',
    reference: {
      en: 'Psalm 103:1-2',
      zh: '詩篇 103:1-2',
      fr: 'Psaume 103:1-2'
    },
    text: {
      en: 'Bless the Lord, O my soul; and all that is within me, bless His holy name! Bless the Lord, O my soul, and forget not all His benefits.',
      zh: '我的心哪，你要稱頌耶和華！凡在我裡面的，也要稱頌祂的聖名！我的心哪，你要稱頌耶和華，不可忘記祂的一切恩惠！',
      fr: "Mon âme, bénis l'Éternel! Que tout ce qui est en moi bénisse son saint nom! Mon âme, bénis l'Éternel, et n'oublie aucun de ses bienfaits!"
    },
    sourceUrl: 'https://www.biblestudytools.com/nkjv/psalms/103.html',
    category: 'comfort',
    themeLabel: { en: 'Bless His Holy Name', zh: '稱頌聖名', fr: 'Bénis le Seigneur' },
    defaultHour: 8
  },
  {
    id: 'proverbs-15-1',
    book: 'proverbs',
    bookName: { en: 'Proverbs', zh: '箴言', fr: 'Proverbes' },
    chapter: 15,
    verse: '1',
    reference: {
      en: 'Proverbs 15:1',
      zh: '箴言 15:1',
      fr: 'Proverbes 15:1'
    },
    text: {
      en: 'A soft answer turns away wrath, but a harsh word stirs up anger.',
      zh: '回答柔和，使怒消退；言語暴戾，觸動氣忿。',
      fr: 'Une réponse douce calme la fureur, mais une parole blessante excite la colère.'
    },
    sourceUrl: 'https://www.biblegateway.com/passage/?search=Proverbs%2015%3A1&version=NKJV',
    category: 'wisdom',
    themeLabel: { en: 'Gentle Speech', zh: '柔和言語', fr: 'Parole Douce' },
    defaultHour: 11
  },
  {
    id: 'john-15-12-13',
    book: 'john',
    bookName: { en: 'Gospel of John', zh: '約翰福音', fr: 'Évangile de Jean' },
    chapter: 15,
    verse: '12-13',
    reference: {
      en: 'John 15:12-13',
      zh: '約翰福音 15:12-13',
      fr: 'Jean 15:12-13'
    },
    text: {
      en: 'This is My commandment, that you love one another as I have loved you. Greater love has no one than this, than to lay down one’s life for his friends.',
      zh: '你們要彼此相愛，像我愛你們一樣；這就是我的命令。人為朋友捨命，人的愛心沒有比這個大的。',
      fr: "C'est ici mon commandement: Aimez-vous les uns les autres, comme je vous ai aimés. Il n'y a pas de plus grand amour que de donner sa vie pour ses amis."
    },
    sourceUrl: 'https://www.biblestudytools.com/nkjv/john/15.html',
    category: 'love',
    themeLabel: { en: 'Sacrificial Love', zh: '捨己大愛', fr: 'Amour Suprême' },
    defaultHour: 14
  },
  {
    id: 'psalm-139-14',
    book: 'psalms',
    bookName: { en: 'Psalms', zh: '詩篇', fr: 'Psaumes' },
    chapter: 139,
    verse: '14',
    reference: {
      en: 'Psalm 139:14',
      zh: '詩篇 139:14',
      fr: 'Psaume 139:14'
    },
    text: {
      en: 'I will praise You, for I am fearfully and wonderfully made; marvelous are Your works, and that my soul knows very well.',
      zh: '我要稱謝你，因我受造奇妙可畏；你的作為奇妙，這是我心深知道的。',
      fr: "Je te loue de ce que je suis une créature si merveilleuse. Tes œuvres sont admirables, et mon âme le reconnaît bien."
    },
    sourceUrl: 'https://www.biblestudytools.com/nkjv/psalms/139.html',
    category: 'truth',
    themeLabel: { en: 'Wonderfully Made', zh: '奇妙創造', fr: 'Création Merveilleuse' },
    defaultHour: 16
  },
  {
    id: 'proverbs-19-21',
    book: 'proverbs',
    bookName: { en: 'Proverbs', zh: '箴言', fr: 'Proverbes' },
    chapter: 19,
    verse: '21',
    reference: {
      en: 'Proverbs 19:21',
      zh: '箴言 19:21',
      fr: 'Proverbes 19:21'
    },
    text: {
      en: 'There are many plans in a man’s heart, nevertheless the Lord’s counsel—that will stand.',
      zh: '人心多有計謀；惟有耶和華的籌算才能立定。',
      fr: "Il y a dans le cœur de l'homme beaucoup de projets, mais c'est le dessein de l'Éternel qui s'accomplit."
    },
    sourceUrl: 'https://www.biblegateway.com/passage/?search=Proverbs%2019%3A21&version=NKJV',
    category: 'wisdom',
    themeLabel: { en: 'Sovereign Purpose', zh: '神之籌算', fr: 'Dessein Souverain' },
    defaultHour: 13
  },
  {
    id: 'john-11-25',
    book: 'john',
    bookName: { en: 'Gospel of John', zh: '約翰福音', fr: 'Évangile de Jean' },
    chapter: 11,
    verse: '25',
    reference: {
      en: 'John 11:25',
      zh: '約翰福音 11:25',
      fr: 'Jean 11:25'
    },
    text: {
      en: 'Jesus said to her, "I am the resurrection and the life. He who believes in Me, though he may die, he shall live."',
      zh: '耶穌對她說：「復活在我，生命也在我。信我的人雖然死了，也必復活。」',
      fr: 'Jésus lui dit: "Je suis la résurrection et la vie. Celui qui croit en moi vivra, quand même il serait mort."'
    },
    sourceUrl: 'https://www.biblestudytools.com/nkjv/john/11.html',
    category: 'hope',
    themeLabel: { en: 'Resurrection Life', zh: '復活生命', fr: 'Résurrection & Vie' },
    defaultHour: 9
  },
  {
    id: 'psalm-16-11',
    book: 'psalms',
    bookName: { en: 'Psalms', zh: '詩篇', fr: 'Psaumes' },
    chapter: 16,
    verse: '11',
    reference: {
      en: 'Psalm 16:11',
      zh: '詩篇 16:11',
      fr: 'Psaume 16:11'
    },
    text: {
      en: 'You will show me the path of life; in Your presence is fullness of joy; at Your right hand are pleasures forevermore.',
      zh: '你必將生命的道路指示我。在你面前有滿足的喜樂；在你右手中有永遠的福樂。',
      fr: "Tu me feras connaître le sentier de la vie; Il y a d'abondantes joies devant ta face, des délices éternelles à ta droite."
    },
    sourceUrl: 'https://www.biblestudytools.com/nkjv/psalms/16.html',
    category: 'peace',
    themeLabel: { en: 'Fullness of Joy', zh: '滿足喜樂', fr: 'Plénitude de Joie' },
    defaultHour: 19
  },
  {
    id: 'proverbs-30-5',
    book: 'proverbs',
    bookName: { en: 'Proverbs', zh: '箴言', fr: 'Proverbes' },
    chapter: 30,
    verse: '5',
    reference: {
      en: 'Proverbs 30:5',
      zh: '箴言 30:5',
      fr: 'Proverbes 30:5'
    },
    text: {
      en: 'Every word of God is pure; He is a shield to those who put their trust in Him.',
      zh: '神的言語，句句都是煉淨的；投靠祂的，祂便作他們的盾牌。',
      fr: "Toute parole de Dieu est éprouvée. Il est un bouclier pour ceux qui cherchent en lui leur refuge."
    },
    sourceUrl: 'https://www.biblegateway.com/passage/?search=Proverbs%2030%3A5&version=NKJV',
    category: 'truth',
    themeLabel: { en: 'Pure Word', zh: '煉淨言語', fr: 'Parole Éprouvée' },
    defaultHour: 5
  }
];

export const SOURCE_LINKS = {
  proverbs: 'https://www.biblegateway.com/passage/?search=Proverbs%201-31&version=NKJV',
  psalms: 'https://www.biblestudytools.com/nkjv/psalms/',
  john: 'https://www.biblestudytools.com/nkjv/john/'
};
