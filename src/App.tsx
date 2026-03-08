import { useState } from "react";

const VERDE = "#4a7c59";
const ORO = "#c9a84c";
const CREMA = "#f5f0e8";
const OSCURO = "#1a1a1a";

const THEMES = {
  light: { bg: CREMA, card: "#ffffff", text: "#2d2d2d", textSub: "#666", border: "#e0d8cc", navBg: OSCURO, sectionBg: "#eee8dc" },
  dark: { bg: "#141414", card: "#1e1e1e", text: "#f0ebe0", textSub: "#aaa", border: "#333", navBg: "#0a0a0a", sectionBg: "#1a1a1a" },
};

const T: Record<string, Record<string, string>> = {
  es: { title:"ATIS BAR", subtitle:"Espacio gastronómico desde 2020", langLabel:"Elegí tu idioma / Choose your language / Escolha seu idioma / 选择您的语言", cart:"Ver pedido", add:"Agregar", yourOrder:"Tu pedido", total:"Total", confirm:"Confirmar y llamar al mozo", newOrder:"Nuevo pedido", showWaiter:"Mostrá esto al mozo", empty:"Tu pedido está vacío", payTitle:"Medios de pago", pay1:"Efectivo", pay2:"Tarjetas Crédito/Débito", pay3:"Mercado Pago", footer:"Precios en pesos argentinos · IVA incluido", ig:"Seguinos @ATIS.BAR", pet:"🐾 Pet Friendly" },
  pt: { title:"ATIS BAR", subtitle:"Espaço gastronômico desde 2020", langLabel:"Elegí tu idioma / Choose your language / Escolha seu idioma / 选择您的语言", cart:"Ver pedido", add:"Adicionar", yourOrder:"Seu pedido", total:"Total", confirm:"Confirmar e chamar o garçom", newOrder:"Novo pedido", showWaiter:"Mostre isso ao garçom", empty:"Seu pedido está vazio", payTitle:"Formas de pagamento", pay1:"Dinheiro", pay2:"Cartões Crédito/Débito", pay3:"Mercado Pago", footer:"Preços em pesos argentinos · IVA incluído", ig:"Siga-nos @ATIS.BAR", pet:"🐾 Pet Friendly" },
  en: { title:"ATIS BAR", subtitle:"Gastronomic space since 2020", langLabel:"Elegí tu idioma / Choose your language / Escolha seu idioma / 选择您的语言", cart:"View order", add:"Add", yourOrder:"Your order", total:"Total", confirm:"Confirm & call waiter", newOrder:"New order", showWaiter:"Show this to the waiter", empty:"Your order is empty", payTitle:"Payment methods", pay1:"Cash", pay2:"Credit/Debit cards", pay3:"Mercado Pago", footer:"Prices in Argentine pesos · VAT included", ig:"Follow us @ATIS.BAR", pet:"🐾 Pet Friendly" },
  zh: { title:"ATIS BAR", subtitle:"美食空间，2020年起", langLabel:"Elegí tu idioma / Choose your language / Escolha seu idioma / 选择您的语言", cart:"查看订单", add:"添加", yourOrder:"您的订单", total:"合计", confirm:"确认并呼叫服务员", newOrder:"新订单", showWaiter:"请将此页面展示给服务员", empty:"您的订单为空", payTitle:"支付方式", pay1:"现金", pay2:"信用卡/借记卡", pay3:"Mercado Pago", footer:"价格以阿根廷比索计 · 含税", ig:"关注我们 @ATIS.BAR", pet:"🐾 宠物友好" },
};

type Item = { id:number; name:Record<string,string>; desc?:Record<string,string>; price:number; emoji:string; promo?:boolean };
type Cat = { id:string; label:Record<string,string>; emoji:string; items:Item[] };

const MENU: Cat[] = [
  { id:"entradas", label:{es:"Entradas",pt:"Entradas",en:"Starters",zh:"前菜"}, emoji:"🥟", items:[
    { id:1, name:{es:"Empanadas",pt:"Pastéis",en:"Empanadas",zh:"馅饼"}, desc:{es:"Carne · Jamón y queso",pt:"Carne · Presunto e queijo",en:"Meat · Ham & cheese",zh:"肉 · 火腿奶酪"}, price:7500, emoji:"🥟" },
    { id:2, name:{es:"Provoleta clásica al oreganato",pt:"Provoleta clássica com orégano",en:"Classic provoleta w/ oregano",zh:"经典普罗沃拉奶酪"}, price:13000, emoji:"🧀" },
    { id:3, name:{es:"Provoleta especial",pt:"Provoleta especial",en:"Special provoleta",zh:"特色普罗沃拉"}, desc:{es:"Huevo y morrones asados",pt:"Ovo e pimentões assados",en:"Egg & roasted peppers",zh:"鸡蛋和烤辣椒"}, price:17000, emoji:"🧀" },
  ]},
  { id:"milanesas", label:{es:"Milanesas",pt:"Milanesas",en:"Schnitzels",zh:"米兰肉排"}, emoji:"🥩", items:[
    { id:10, name:{es:"Milanesa de ternera/suprema",pt:"Milanesa de vitela/suprema",en:"Veal/chicken schnitzel",zh:"小牛肉排"}, price:23000, emoji:"🥩" },
    { id:11, name:{es:"Milanesa de ternera napolitana",pt:"Milanesa napolitana de vitela",en:"Neapolitan veal schnitzel",zh:"那不勒斯肉排"}, price:26000, emoji:"🥩" },
    { id:12, name:{es:"Milanesa fugazzetta",pt:"Milanesa fugazzetta",en:"Fugazzetta schnitzel",zh:"富加泽塔肉排"}, price:26000, emoji:"🥩" },
    { id:13, name:{es:"Milanesa de berenjena napolitana",pt:"Milanesa de berinjela napolitana",en:"Eggplant schnitzel",zh:"茄子米兰肉排"}, price:16000, emoji:"🍆" },
    { id:14, name:{es:"Milanesa de la casa",pt:"Milanesa da casa",en:"House schnitzel",zh:"招牌肉排"}, desc:{es:"Huevo frito, morrones asados y papas fritas",pt:"Ovo frito, pimentões assados e batatas fritas",en:"Fried egg, roasted peppers & fries",zh:"煎蛋、烤辣椒和薯条"}, price:52000, emoji:"🥩", promo:true },
  ]},
  { id:"parrilla", label:{es:"Parrilla",pt:"Churrasco",en:"Grill",zh:"烧烤"}, emoji:"🔥", items:[
    { id:20, name:{es:"Parillada para 2 personas",pt:"Parillada para 2 pessoas",en:"Mixed grill for 2",zh:"双人烤肉拼盘"}, desc:{es:"Asado, vacío, bondiola, pollo, chorizo, morcilla, chinchulines",pt:"Costela, vazio, bondiola, frango, chorizo, morcilla, chinchulines",en:"Ribs, flank, bondiola, chicken, chorizo, blood sausage, chitterlings",zh:"排骨、腹肉、颈肉、鸡肉等"}, price:67500, emoji:"🔥", promo:true },
    { id:21, name:{es:"Mix de carnes",pt:"Mix de carnes",en:"Meat mix",zh:"混合肉类"}, desc:{es:"Lomo, bife de chorizo, asado, vacío y entraña",pt:"Lombo, bife de chorizo, costela, vazio e entraña",en:"Tenderloin, sirloin, ribs, flank & skirt",zh:"里脊、西冷、排骨等"}, price:81100, emoji:"🥩" },
    { id:22, name:{es:"Asado",pt:"Costela assada",en:"Beef ribs",zh:"烤排骨"}, price:31000, emoji:"🥩" },
    { id:23, name:{es:"Entraña",pt:"Entraña",en:"Skirt steak",zh:"裙肉"}, price:55000, emoji:"🥩" },
    { id:24, name:{es:"Ojo de bife",pt:"Olho de bife",en:"Ribeye",zh:"肋眼牛排"}, price:38000, emoji:"🥩" },
    { id:25, name:{es:"Bife de chorizo",pt:"Bife de chorizo",en:"Sirloin steak",zh:"西冷牛排"}, price:39000, emoji:"🥩" },
    { id:26, name:{es:"Vacío",pt:"Vazio",en:"Flank steak",zh:"腹肉"}, price:34000, emoji:"🥩" },
    { id:27, name:{es:"Lomo",pt:"Lombo",en:"Tenderloin",zh:"里脊"}, price:40000, emoji:"🥩" },
    { id:28, name:{es:"Pollo grillado",pt:"Frango grelhado",en:"Grilled chicken",zh:"烤鸡"}, price:19000, emoji:"🍗" },
    { id:29, name:{es:"Matrimonio (chorizo y morcilla)",pt:"Matrimônio (chorizo e morcilla)",en:"Matrimonio (chorizo & blood sausage)",zh:"婚礼套餐（香肠+血肠）"}, price:16000, emoji:"🌭" },
  ]},
  { id:"sandwiches", label:{es:"Sandwiches",pt:"Sanduíches",en:"Sandwiches",zh:"三明治"}, emoji:"🥪", items:[
    { id:30, name:{es:"Bondiola",pt:"Bondiola",en:"Bondiola sandwich",zh:"颈肉三明治"}, desc:{es:"Lechuga, tomate, morrón asado",pt:"Alface, tomate, pimentão assado",en:"Lettuce, tomato, roasted pepper",zh:"生菜、番茄、烤辣椒"}, price:27000, emoji:"🥪" },
    { id:31, name:{es:"Lomo",pt:"Lombo",en:"Tenderloin sandwich",zh:"里脊三明治"}, desc:{es:"Lechuga, tomate, morrón asado",pt:"Alface, tomate, pimentão assado",en:"Lettuce, tomato, roasted pepper",zh:"生菜、番茄、烤辣椒"}, price:28500, emoji:"🥪" },
    { id:32, name:{es:"Vacío (provoleta chimichurri)",pt:"Vazio (provoleta chimichurri)",en:"Flank steak (provoleta chimichurri)",zh:"腹肉三明治"}, price:32000, emoji:"🥪" },
    { id:33, name:{es:"Bife de chorizo con criolla",pt:"Bife de chorizo com criolla",en:"Sirloin with criolla sauce",zh:"西冷配克里奥拉酱"}, price:29000, emoji:"🥪" },
    { id:34, name:{es:"Entraña (cebolla caramelizada, rúcula)",pt:"Entraña (cebola caramelizada, rúcula)",en:"Skirt steak (caramelized onion, arugula)",zh:"裙肉配焦糖洋葱芝麻菜"}, price:30000, emoji:"🥪" },
  ]},
  { id:"ensaladas", label:{es:"Ensaladas y Guarniciones",pt:"Saladas e Guarnições",en:"Salads & Sides",zh:"沙拉和配菜"}, emoji:"🥗", items:[
    { id:40, name:{es:"Ensalada Caesar",pt:"Salada Caesar",en:"Caesar salad",zh:"凯撒沙拉"}, price:17000, emoji:"🥗" },
    { id:41, name:{es:"Ensalada mediterránea",pt:"Salada mediterrânea",en:"Mediterranean salad",zh:"地中海沙拉"}, price:23000, emoji:"🥗" },
    { id:42, name:{es:"Ensalada de peras asadas",pt:"Salada de peras assadas",en:"Roasted pear salad",zh:"烤梨沙拉"}, price:23000, emoji:"🥗" },
    { id:43, name:{es:"Ensalada mixta",pt:"Salada mista",en:"Mixed salad",zh:"混合沙拉"}, price:15000, emoji:"🥗" },
    { id:44, name:{es:"Ensalada tres gustos",pt:"Salada três gostos",en:"Three-taste salad",zh:"三味沙拉"}, price:15000, emoji:"🥗" },
    { id:45, name:{es:"Papas fritas",pt:"Batatas fritas",en:"French fries",zh:"薯条"}, price:10000, emoji:"🍟" },
    { id:46, name:{es:"Arroz blanco",pt:"Arroz branco",en:"White rice",zh:"白米饭"}, price:7200, emoji:"🍚" },
  ]},
  { id:"cafeteria", label:{es:"Cafetería",pt:"Cafeteria",en:"Coffee & Drinks",zh:"咖啡饮品"}, emoji:"☕", items:[
    { id:50, name:{es:"Café",pt:"Café",en:"Coffee",zh:"咖啡"}, price:4000, emoji:"☕" },
    { id:51, name:{es:"Café con leche",pt:"Café com leite",en:"Café au lait",zh:"牛奶咖啡"}, price:4500, emoji:"☕" },
    { id:52, name:{es:"Café cortado",pt:"Café cortado",en:"Cortado",zh:"卡塔朵"}, price:4500, emoji:"☕" },
    { id:53, name:{es:"Ristretto",pt:"Ristretto",en:"Ristretto",zh:"浓缩咖啡"}, price:3000, emoji:"☕" },
    { id:54, name:{es:"Capuccino",pt:"Cappuccino",en:"Cappuccino",zh:"卡布奇诺"}, price:5500, emoji:"☕" },
    { id:55, name:{es:"Café irlandés",pt:"Café irlandês",en:"Irish coffee",zh:"爱尔兰咖啡"}, price:6500, emoji:"☕" },
    { id:56, name:{es:"Submarino",pt:"Submarino",en:"Hot chocolate",zh:"热巧克力"}, price:5500, emoji:"🍫" },
    { id:57, name:{es:"Té",pt:"Chá",en:"Tea",zh:"茶"}, price:3500, emoji:"🍵" },
    { id:58, name:{es:"Té con leche",pt:"Chá com leite",en:"Milk tea",zh:"奶茶"}, price:3800, emoji:"🍵" },
    { id:59, name:{es:"Medialunas",pt:"Croissants",en:"Croissants",zh:"可颂"}, price:3000, emoji:"🥐" },
    { id:60, name:{es:"Medialunas JyQ",pt:"Croissants J&Q",en:"Ham & cheese croissants",zh:"火腿奶酪可颂"}, price:7500, emoji:"🥐" },
    { id:61, name:{es:"Avocado toast",pt:"Torrada de abacate",en:"Avocado toast",zh:"鳄梨吐司"}, price:10000, emoji:"🥑" },
    { id:62, name:{es:"Tostado JyQ",pt:"Torrada J&Q",en:"Ham & cheese toast",zh:"火腿奶酪烤面包"}, price:9500, emoji:"🍞" },
    { id:63, name:{es:"Tostado queso y tomate",pt:"Torrada queijo e tomate",en:"Cheese & tomato toast",zh:"奶酪番茄烤面包"}, price:9500, emoji:"🍞" },
    { id:64, name:{es:"Jugo de naranja",pt:"Suco de laranja",en:"Orange juice",zh:"橙汁"}, price:8000, emoji:"🍊" },
    { id:65, name:{es:"Licuado",pt:"Vitamina",en:"Smoothie",zh:"奶昔"}, price:9000, emoji:"🥤" },
  ]},
  { id:"postres", label:{es:"Postres",pt:"Sobremesas",en:"Desserts",zh:"甜点"}, emoji:"🍰", items:[
    { id:70, name:{es:"Mini cakes (NY, Chocotorta, Cheesecake, Lemon Pie, Red Velvet)",pt:"Mini bolos (NY, Chocotorta, Cheesecake, Lemon Pie, Red Velvet)",en:"Mini cakes (NY, Chocotorta, Cheesecake, Lemon Pie, Red Velvet)",zh:"迷你蛋糕（多款口味）"}, price:9500, emoji:"🎂", promo:true },
    { id:71, name:{es:"Flan mixto",pt:"Flan misto",en:"Mixed flan",zh:"混合布丁"}, price:8000, emoji:"🍮" },
    { id:72, name:{es:"Budín de pan",pt:"Pudim de pão",en:"Bread pudding",zh:"面包布丁"}, price:8000, emoji:"🍮" },
    { id:73, name:{es:"Panqueques con dulce de leche",pt:"Panquecas com doce de leite",en:"Pancakes with dulce de leche",zh:"煎饼配牛奶焦糖"}, price:10000, emoji:"🥞" },
    { id:74, name:{es:"Tiramisú",pt:"Tiramisù",en:"Tiramisu",zh:"提拉米苏"}, price:9500, emoji:"🍰" },
  ]},
  { id:"cervezas", label:{es:"Cervezas",pt:"Cervejas",en:"Beers",zh:"啤酒"}, emoji:"🍺", items:[
    { id:80, name:{es:"Pinta Andes",pt:"Pinta Andes",en:"Andes pint",zh:"安第斯啤酒"}, price:7000, emoji:"🍺" },
    { id:81, name:{es:"Pinta Quilmes",pt:"Pinta Quilmes",en:"Quilmes pint",zh:"奎尔梅斯啤酒"}, price:7000, emoji:"🍺" },
    { id:82, name:{es:"Pinta Patagonia",pt:"Pinta Patagonia",en:"Patagonia pint",zh:"巴塔哥尼亚啤酒"}, price:8000, emoji:"🍺" },
    { id:83, name:{es:"Andes Rubia Lata",pt:"Andes Rubia Lata",en:"Andes Lager can",zh:"安第斯淡啤罐"}, price:8000, emoji:"🍺" },
    { id:84, name:{es:"Andes Roja Lata",pt:"Andes Roja Lata",en:"Andes Red can",zh:"安第斯红啤罐"}, price:8000, emoji:"🍺" },
    { id:85, name:{es:"Andes IPA Lata",pt:"Andes IPA Lata",en:"Andes IPA can",zh:"安第斯IPA罐"}, price:8000, emoji:"🍺" },
    { id:86, name:{es:"Andes Negra Lata",pt:"Andes Negra Lata",en:"Andes Dark can",zh:"安第斯黑啤罐"}, price:8000, emoji:"🍺" },
    { id:87, name:{es:"Quilmes 0% Lata",pt:"Quilmes 0% Lata",en:"Quilmes 0% can",zh:"零酒精啤酒罐"}, price:7000, emoji:"🍺" },
  ]},
  { id:"whisky", label:{es:"Whisky",pt:"Whisky",en:"Whisky",zh:"威士忌"}, emoji:"🥃", items:[
    { id:90, name:{es:"Johnnie Walker Red Label",pt:"Johnnie Walker Red Label",en:"Johnnie Walker Red Label",zh:"红方威士忌"}, price:18000, emoji:"🥃" },
    { id:91, name:{es:"Johnnie Walker Black Label",pt:"Johnnie Walker Black Label",en:"Johnnie Walker Black Label",zh:"黑方威士忌"}, price:13000, emoji:"🥃" },
    { id:92, name:{es:"Medida de whisky",pt:"Dose de whisky",en:"Whisky measure",zh:"威士忌单份"}, price:10000, emoji:"🥃" },
  ]},
  { id:"vinos", label:{es:"Vinos",pt:"Vinhos",en:"Wines",zh:"葡萄酒"}, emoji:"🍷", items:[
    { id:100, name:{es:"Copa de vino tinto/blanco",pt:"Taça de vinho tinto/branco",en:"Glass of red/white wine",zh:"红/白葡萄酒杯"}, price:6000, emoji:"🍷" },
    { id:101, name:{es:"San Telmo Malbec",pt:"San Telmo Malbec",en:"San Telmo Malbec",zh:"圣特尔莫马尔贝克"}, price:13000, emoji:"🍷" },
    { id:102, name:{es:"Trumpeter Chardonnay",pt:"Trumpeter Chardonnay",en:"Trumpeter Chardonnay",zh:"特朗佩特霞多丽"}, price:23000, emoji:"🍾" },
    { id:103, name:{es:"Trumpeter Malbec",pt:"Trumpeter Malbec",en:"Trumpeter Malbec",zh:"特朗佩特马尔贝克"}, price:23000, emoji:"🍷" },
    { id:104, name:{es:"Trumpeter Sauvignon Blanc",pt:"Trumpeter Sauvignon Blanc",en:"Trumpeter Sauvignon Blanc",zh:"长相思"}, price:23000, emoji:"🍾" },
    { id:105, name:{es:"Portillo Malbec",pt:"Portillo Malbec",en:"Portillo Malbec",zh:"珀蒂罗马尔贝克"}, price:16000, emoji:"🍷" },
    { id:106, name:{es:"Cordero con Piel de Lobo Malbec",pt:"Cordero con Piel de Lobo Malbec",en:"Cordero con Piel de Lobo Malbec",zh:"羊皮狼马尔贝克"}, price:19000, emoji:"🍷" },
    { id:107, name:{es:"Rutini Cabernet",pt:"Rutini Cabernet",en:"Rutini Cabernet",zh:"路提尼赤霞珠"}, price:46000, emoji:"🍷" },
    { id:108, name:{es:"Rutini Malbec",pt:"Rutini Malbec",en:"Rutini Malbec",zh:"路提尼马尔贝克"}, price:33000, emoji:"🍷" },
    { id:109, name:{es:"Cosecha Tardía",pt:"Colheita Tardia",en:"Late harvest",zh:"晚收葡萄酒"}, price:17000, emoji:"🍷" },
  ]},
  { id:"cocteles", label:{es:"Cócteles",pt:"Coquetéis",en:"Cocktails",zh:"鸡尾酒"}, emoji:"🍹", items:[
    { id:110, name:{es:"Jarra de clericó/sangría",pt:"Jarra de clericó/sangria",en:"Pitcher of clericó/sangria",zh:"水果酒罐"}, price:15000, emoji:"🍹", promo:true },
    { id:111, name:{es:"Cuba Libre",pt:"Cuba Libre",en:"Cuba Libre",zh:"古巴自由"}, price:9000, emoji:"🥃" },
    { id:112, name:{es:"Aperol Spritz",pt:"Aperol Spritz",en:"Aperol Spritz",zh:"阿普罗开胃酒"}, price:9000, emoji:"🍊" },
    { id:113, name:{es:"Caipiroska",pt:"Caipiroska",en:"Caipiroska",zh:"柠檬伏特加"}, price:9000, emoji:"🍋" },
    { id:114, name:{es:"Fernet con Coca",pt:"Fernet com Coca",en:"Fernet & Coke",zh:"费内特可乐"}, price:9000, emoji:"🥃" },
    { id:115, name:{es:"Gin Tonic Ginkgo",pt:"Gin Tônica Ginkgo",en:"Gin Tonic Ginkgo",zh:"金汤力"}, price:9000, emoji:"🍸" },
    { id:116, name:{es:"Negroni",pt:"Negroni",en:"Negroni",zh:"尼格罗尼"}, price:9000, emoji:"🍸" },
    { id:117, name:{es:"Campari con naranja",pt:"Campari com laranja",en:"Campari with orange",zh:"金巴利橙汁"}, price:9000, emoji:"🍊" },
    { id:118, name:{es:"Tinto de verano",pt:"Tinto de verão",en:"Summer wine",zh:"夏日红酒"}, price:9000, emoji:"🍷" },
  ]},
  { id:"sin_alcohol", label:{es:"Sin Alcohol",pt:"Sem Álcool",en:"Non-Alcoholic",zh:"无酒精饮品"}, emoji:"💧", items:[
    { id:120, name:{es:"Agua sin gas",pt:"Água sem gás",en:"Still water",zh:"无气水"}, price:5000, emoji:"💧" },
    { id:121, name:{es:"Agua con gas",pt:"Água com gás",en:"Sparkling water",zh:"气泡水"}, price:5000, emoji:"💧" },
    { id:122, name:{es:"Agua saborizada",pt:"Água saborizada",en:"Flavored water",zh:"调味水"}, price:5000, emoji:"🧃" },
    { id:123, name:{es:"Gaseosas",pt:"Refrigerantes",en:"Soft drinks",zh:"汽水"}, price:6000, emoji:"🥤" },
    { id:124, name:{es:"Limonada clásica",pt:"Limonada clássica",en:"Classic lemonade",zh:"经典柠檬水"}, price:6500, emoji:"🍋" },
    { id:125, name:{es:"Limonada con menta y jengibre",pt:"Limonada com hortelã e gengibre",en:"Mint & ginger lemonade",zh:"薄荷姜汁柠檬水"}, price:9000, emoji:"🍋" },
  ]},
  { id:"champagne", label:{es:"Champagne",pt:"Champanhe",en:"Champagne",zh:"香槟"}, emoji:"🥂", items:[
    { id:130, name:{es:"Copa de Champagne",pt:"Taça de Champanhe",en:"Glass of Champagne",zh:"香槟杯"}, price:7000, emoji:"🥂" },
  ]},
];

type CartItem = { item:Item; qty:number };

export default function App() {
  const [lang, setLang] = useState<"es"|"pt"|"en"|"zh">("es");
  const [dark, setDark] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showWaiter, setShowWaiter] = useState(false);

  const t = T[lang];
  const th = dark ? THEMES.dark : THEMES.light;
  const fmt = (n:number) => "$" + n.toLocaleString("es-AR");

  const addItem = (item:Item) => setCart(prev => {
    const ex = prev.find(c=>c.item.id===item.id);
    return ex ? prev.map(c=>c.item.id===item.id?{...c,qty:c.qty+1}:c) : [...prev,{item,qty:1}];
  });
  const removeItem = (id:number) => setCart(prev => {
    const ex = prev.find(c=>c.item.id===id);
    if(!ex) return prev;
    return ex.qty===1 ? prev.filter(c=>c.item.id!==id) : prev.map(c=>c.item.id===id?{...c,qty:c.qty-1}:c);
  });
  const getQty = (id:number) => cart.find(c=>c.item.id===id)?.qty||0;
  const totalItems = cart.reduce((s,c)=>s+c.qty,0);
  const totalPrice = cart.reduce((s,c)=>s+c.item.price*c.qty,0);

  const LANGS = [{code:"es",flag:"🇦🇷"},{code:"pt",flag:"🇧🇷"},{code:"en",flag:"🇺🇸"},{code:"zh",flag:"🇨🇳"}];

  const btn = (onClick:()=>void, label:string, style?:React.CSSProperties) => (
    <button onClick={onClick} style={{border:"none",cursor:"pointer",...style}}>{label}</button>
  );

  if (showWaiter) return (
    <div style={{minHeight:"100vh",background:th.bg,color:th.text,fontFamily:"Georgia,serif",padding:24}}>
      <div style={{maxWidth:500,margin:"0 auto",background:th.card,borderRadius:16,padding:28,boxShadow:"0 4px 24px rgba(0,0,0,0.15)"}}>
        <div style={{textAlign:"center",marginBottom:24}}>
          <div style={{fontSize:40}}>🌿</div>
          <h2 style={{color:VERDE,margin:"8px 0 4px"}}>ATIS BAR</h2>
          <p style={{color:th.textSub,fontSize:14}}>{t.showWaiter}</p>
        </div>
        {cart.map(c=>(
          <div key={c.item.id} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:`1px solid ${th.border}`}}>
            <span>{c.item.emoji} {c.item.name[lang]} × {c.qty}</span>
            <span style={{color:VERDE,fontWeight:"bold"}}>{fmt(c.item.price*c.qty)}</span>
          </div>
        ))}
        <div style={{display:"flex",justifyContent:"space-between",padding:"16px 0",fontWeight:"bold",fontSize:20}}>
          <span>{t.total}</span><span style={{color:VERDE}}>{fmt(totalPrice)}</span>
        </div>
        {btn(()=>{setCart([]);setShowCart(false);setShowWaiter(false);}, `🔄 ${t.newOrder}`, {width:"100%",padding:"14px",background:VERDE,color:"white",borderRadius:10,fontSize:16,marginTop:8})}
      </div>
    </div>
  );

  if (showCart) return (
    <div style={{minHeight:"100vh",background:th.bg,color:th.text,fontFamily:"Georgia,serif",padding:24}}>
      <div style={{maxWidth:500,margin:"0 auto"}}>
        {btn(()=>setShowCart(false),"←", {background:"none",color:th.text,fontSize:24,marginBottom:16})}
        <h2 style={{color:VERDE,marginBottom:20}}>{t.yourOrder}</h2>
        {cart.length===0 ? <p style={{color:th.textSub,textAlign:"center",marginTop:40}}>{t.empty}</p> : <>
          {cart.map(c=>(
            <div key={c.item.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 0",borderBottom:`1px solid ${th.border}`}}>
              <span style={{fontSize:20}}>{c.item.emoji}</span>
              <span style={{flex:1,marginLeft:10}}>{c.item.name[lang]}</span>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                {btn(()=>removeItem(c.item.id),"−",{width:28,height:28,borderRadius:"50%",background:"#ddd",fontSize:16})}
                <span style={{fontWeight:"bold"}}>{c.qty}</span>
                {btn(()=>addItem(c.item),"+",{width:28,height:28,borderRadius:"50%",background:VERDE,color:"white",fontSize:16})}
                <span style={{minWidth:80,textAlign:"right",color:VERDE,fontWeight:"bold"}}>{fmt(c.item.price*c.qty)}</span>
              </div>
            </div>
          ))}
          <div style={{display:"flex",justifyContent:"space-between",padding:"16px 0",fontWeight:"bold",fontSize:20}}>
            <span>{t.total}</span><span style={{color:VERDE}}>{fmt(totalPrice)}</span>
          </div>
          {btn(()=>setShowWaiter(true),`✅ ${t.confirm}`,{width:"100%",padding:"16px",background:VERDE,color:"white",borderRadius:12,fontSize:16,fontWeight:"bold"})}
        </>}
      </div>
    </div>
  );

  return (
    <div style={{minHeight:"100vh",background:th.bg,color:th.text,fontFamily:"Georgia,serif",transition:"all 0.3s"}}>
      {/* NAV */}
      <div style={{background:th.navBg,padding:"10px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:100}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          {LANGS.map(l=>(
            <button key={l.code} onClick={()=>setLang(l.code as any)}
              style={{fontSize:20,background:"none",border:lang===l.code?`2px solid ${ORO}`:"2px solid transparent",borderRadius:6,cursor:"pointer",padding:"2px 4px",opacity:lang===l.code?1:0.6}}>
              {l.flag}
            </button>
          ))}
          <span style={{color:ORO,fontSize:8,fontWeight:"bold",marginLeft:6,maxWidth:160,lineHeight:1.3}}>{t.langLabel}</span>
        </div>
        {btn(()=>setDark(!dark), dark?"☀️":"🌙", {background:"none",color:ORO,fontSize:22})}
      </div>

      {/* HEADER */}
      <div style={{background:`linear-gradient(135deg, ${OSCURO} 0%, #2d4a35 100%)`,padding:"40px 20px",textAlign:"center"}}>
        <div style={{fontSize:14,color:ORO,letterSpacing:4,marginBottom:8}}>✦ SAN TELMO · BUENOS AIRES ✦</div>
        <h1 style={{fontSize:52,color:"white",margin:"0 0 4px",letterSpacing:8,fontWeight:"bold"}}>ATIS</h1>
        <div style={{fontSize:16,color:"#ccc",letterSpacing:4,marginBottom:10}}>BAR</div>
        <div style={{fontSize:13,color:ORO}}>{t.subtitle}</div>
        <div style={{fontSize:12,color:"#aaa",marginTop:6}}>🌿 Edificio histórico de 1890 · {t.pet}</div>
      </div>

      {/* MENU */}
      <div style={{maxWidth:700,margin:"0 auto",padding:"20px 16px"}}>
        {MENU.map(cat=>(
          <div key={cat.id} style={{marginBottom:32}}>
            <div style={{background:VERDE,color:"white",padding:"10px 18px",borderRadius:10,fontSize:17,fontWeight:"bold",marginBottom:12,display:"flex",alignItems:"center",gap:10,letterSpacing:2}}>
              <span>{cat.emoji}</span><span>{cat.label[lang]}</span>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {cat.items.map(item=>{
                const qty = getQty(item.id);
                return (
                  <div key={item.id} style={{background:th.card,borderRadius:12,padding:"12px 14px",border:item.promo?`2px solid ${ORO}`:`1px solid ${th.border}`,display:"flex",justifyContent:"space-between",alignItems:"center",boxShadow:item.promo?`0 2px 12px ${ORO}33`:"none"}}>
                    <div style={{flex:1}}>
                      <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                        <span style={{fontSize:18}}>{item.emoji}</span>
                        <span style={{fontWeight:"bold",fontSize:14}}>{item.name[lang]}</span>
                        {item.promo && <span style={{background:ORO,color:OSCURO,fontSize:10,fontWeight:"bold",padding:"2px 8px",borderRadius:20}}>⭐ ESPECIAL</span>}
                      </div>
                      {item.desc && <div style={{color:th.textSub,fontSize:11,marginTop:3,marginLeft:26}}>{item.desc[lang]}</div>}
                      <div style={{color:VERDE,fontWeight:"bold",fontSize:16,marginTop:4,marginLeft:26}}>{fmt(item.price)}</div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:6,marginLeft:10}}>
                      {qty>0 ? <>
                        {btn(()=>removeItem(item.id),"−",{width:30,height:30,borderRadius:"50%",background:"#ddd",fontSize:16,fontWeight:"bold"})}
                        <span style={{fontWeight:"bold",minWidth:18,textAlign:"center"}}>{qty}</span>
                        {btn(()=>addItem(item),"+",{width:30,height:30,borderRadius:"50%",background:VERDE,color:"white",fontSize:16})}
                      </> : btn(()=>addItem(item),`+ ${t.add}`,{padding:"7px 14px",background:VERDE,color:"white",borderRadius:20,fontWeight:"bold",fontSize:12})}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* FOOTER */}
        <div style={{background:th.sectionBg,borderRadius:14,padding:20,marginTop:10,textAlign:"center"}}>
          <div style={{fontSize:15,fontWeight:"bold",color:VERDE,marginBottom:10}}>💳 {t.payTitle}</div>
          <div style={{display:"flex",justifyContent:"center",gap:20,flexWrap:"wrap",marginBottom:12}}>
            <span>💵 {t.pay1}</span><span>💳 {t.pay2}</span><span>📱 {t.pay3}</span>
          </div>
          <div style={{color:th.textSub,fontSize:12,marginBottom:8}}>{t.footer}</div>
          <div style={{color:ORO,fontSize:13,fontWeight:"bold"}}>📸 {t.ig}</div>
          <div style={{color:th.textSub,fontSize:11,marginTop:8}}>🌿 Edificio de 1890 · Antiguo convento y hotel de inmigrantes · Espacio gastronómico desde dic. 2020</div>
        </div>
        <div style={{height:80}}/>
      </div>

      {/* FLOATING CART */}
      {totalItems>0 && (
        <div style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",zIndex:200}}>
          <button onClick={()=>setShowCart(true)}
            style={{background:VERDE,color:"white",border:"none",borderRadius:30,padding:"14px 28px",fontSize:15,fontWeight:"bold",cursor:"pointer",boxShadow:"0 4px 20px rgba(0,0,0,0.3)",display:"flex",alignItems:"center",gap:12}}>
            🛒 {t.cart} ({totalItems}) · {fmt(totalPrice)}
          </button>
        </div>
      )}
    </div>
  );
}
