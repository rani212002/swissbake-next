"""Generates src/data/*.json from content captured from swissbake.in.
Run: python3 scripts/build_data.py"""
import json, re, urllib.parse
from datetime import datetime
from pathlib import Path

OUT = Path("src/data")
def dump(name, obj):
    (OUT / name).write_text(json.dumps(obj, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

# ---------------------------------------------------------------- blog
BASE = "https://b2b.swissbake.in/images/Blog/"
cats = {
 "trends": ("Trends","baking-trend-swissbake-blog","Bakery Trends | SwissBake Blog"),
 "inspiration": ("Inspiration","baking-inspiration-swissbake-blog","Baking Inspiration | SwissBake Blog"),
 "advice": ("Advice","baking-advice-swissbake-blog","Baking Advice | SwissBake Blog"),
 "insights": ("Insights","baking-industry-insights-swissbake-blog","Baking Industry Insights | SwissBake Blog"),
 "featured": ("Featured","featured-blogs-swissbake","Featured Blogs | SwissBake"),
}
members = {
"trends": "high-protein-bread-menu-ideas matcha-trends-and-menu-innovation sourdough-as-brand-asset-for-modern-bakeries bomboloni-donut-guide-swissbake-mix bombolonis-using-a-donut-mix embrace-the-essence-of-swiss-baking sugar-art-decor-inspiration bloom-your-springtime-baking swissbake-celebrates-10-successful-years-of-innovation challenges-in-baking-gluten-free-confectionery-products are-you-using-sourdough-in-your-pizza ingredients-to-bake-artisan-baguette-using-swissbake-aroma-tic-active-sourdough-starter churros-the-future-trend 3-creative-products-made-using-brownie-waffle-mix aroma-tic-bake-your-imagination-with-a-gently-dried-sourdough-starter importance-of-regulating-the-dough-temp-during-baking increasing-demand-of-gluten-free-baked-products the-french-croissant-origin-recipe-method",
"inspiration": "evolution-of-flour innovative-uses-of-waffle-cones festive-bakery-trends-2023 beyond-basic-brownies how-much-chocolate-is-too-much-chocolate the-creative-art-of-chocolate-tempering four-magnifique-florentine-recipes eight-sweet-and-savory-waffle-licious-recipes bake-your-way-with-red-velvet-feast exploring-the-diversity-of-german-breads-a-guide-to-professional-bakers factors-influencing-the-oven-spring-of-your-bread pancakes-from-the-breakfast-table-to-qsr",
"advice": "festive-bakes-for-seasonal-bakery-menu increase-cafe-average-order-value-with-bakery-pairings how-to-reduce-bakery-production-cost-without-losing-quality how-to-make-korean-mochi-bread dough-improvers-vs-conditioners-key-differences common-pizza-dough-problems-solved youre-using-the-wrong-flour-for-your-pizza-dough master-sourdough-baking artisan-baking-for-central-kitchens flour-selection-for-baking plum-cake-premix-vs-traditional-baking the-role-of-butter-in-laminated-pastries master-french-baking-professional-mixes french-laminated-pastry-doughs what-are-viennese-pastries must-have-flour-as-bakery-essentials health-benefits-of-sourdough waffle-wonderland-sweet-savoury-toppings decoding-brownie-textures spice-up-your-professional-baking guide-to-bake-with-high-fiber-and-protein-ingredients summer-baking-tips-for-professionals ways-to-handle-bakery-wastage choosing-the-right-flour-for-your-baked-products reasons-why-patties-require-potato-buns-to-make-perfect-burgers how-to-prepare-for-an-uncertain-festive-demand learnings-from-covid-pandemic-on-how-to-build-a-stronger-bakery-business boost-your-bakery-sales-by-selling-online 4-health-benefits-of-pumpernickel-bread-you-must-know bread-staling-concept-process-and-factors-influencing-it",
"insights": "dehydrated-sourdough-powder sourdough-over-commercial-yeast elevate-your-bakes-with-coffee dough-variability-in-pizza-chains italian-pizza-sugo what-makes-a-pizza-authentic sourdough-heritage-to-artisan-baking sourdough-vs-yeast functional-ingredients-in-bakery-mixes dehydrated-sourdough-for-artisan-baking mastering-high-hydration-doughs benefits-of-sugo-powder pizza-flour-in-your-pizzeria authentic-pizza-skills why-protein-matters health-benefits-of-sourdough-with-swissbake how-sourdough-powders-help-bakers science-behind-sourdough-powders sourdough-powder-for-artisan-baking sourdough-baking-guide role-of-sugar-in-baking master-dough-hydration custard-powder-and-creams snow-sugar role-of-enzymes-in-dough brownie-vs-blondie different-types-of-gluten-free-flours insight-of-red-velvet-crumbs baking-powder-vs-baking-soda baking-best-practices festive-fruit-cake-trends crafting-perfect-waffles science-of-pizza-making craft-of-chocolate-flavouring exploring-the-world-of-pastry-doughs unlocking-the-potential-role-of-herbs-in-professional-baking bake-right-and-bake-healthy bakers-math-percentage-method-and-calculator procure-bakery-ingredient-online-india boost-your-sales-by-adding-plumcakes-in-your-festive-offerings serving-the-growing-demand-for-vegetarian-bakery-foods the-donut-dessert-with-a-past-and-future rye-a-powerhouse-grain-with-excellent-flavour-profile",
"featured": "celebratingbreadinallitsforms%7Cinternationalbreadsday science-of-eggless-baking honey-cake-layering crafting-the-perfect-waffle crafting-pizza-morcote-aromatic six-bakery-trends-to-boost-your-business-this-festive-season french-up-your-perfect-macaron experience-the-swiss-passion-for-baking role-of-salt-in-bread-baking",
}
cat_of = {}
for c, s in members.items():
    for slug in s.split():
        cat_of.setdefault(slug, []).append(c)

posts = []
for line in Path("scripts/blog_raw.txt").read_text(encoding="utf-8").splitlines():
    if not line.strip(): continue
    slug, title, img, date, exc = [p.strip() for p in line.split(" ;; ")]
    if slug.startswith("pancakes-"):
        exc = "Transform pancakes from breakfast to QSR favorites! Explore creative recipes and serving ideas to elevate your pancake offerings all day long"
    posts.append({
        "id": slug, "slug": slug, "title": title,
        "image_url": BASE + urllib.parse.quote(img, safe="-_.~()"),
        "published_at": datetime.strptime(date, "%d %b %Y").strftime("%Y-%m-%d"),
        "excerpt": exc,
        "categories": cat_of.get(slug, []),
        "body": None,
    })
missing = [p["slug"] for p in posts if not p["categories"]]
print("posts:", len(posts), "| uncategorised:", missing)
dump("blog.json", {
    "page": {"title": "BLOG ARTICLES",
             "subtitle": "Articles covering bakery trends, insights, know-how and science behind baking."},
    "categories": [
        {"id": "all", "label": "All", "slug": "all", "seo_title": "Blog Articles | SwissBake"},
        *[{"id": k, "label": v[0], "slug": v[1], "seo_title": v[2]} for k, v in cats.items()],
        {"id": "recents", "label": "Recents", "slug": "recent-blogs-swissbake", "seo_title": "Recent Blogs | SwissBake"},
    ],
    "recent_count": 12,
    "posts": posts,
})

# ---------------------------------------------------------------- catalog
CAT = [
 ("swissbake-flour","SPECIALTY FLOURS"),("german-rye-bread-mix","GERMAN RYE BREADS"),
 ("sourdough-bread-ingredients","SOURDOUGH INGREDIENTS"),("high-fiber-bread-mix","HIGH-FIBRE BREADS"),
 ("pizza-baking-ingredients","PIZZA INGREDIENTS"),("healthy-bread-mix","HEALTH & WELLNESS BREADS"),
 ("specialty-bakery-bread-mix","SPECIALITY BREADS"),("morning-soft-bread-mix","MORNING SOFT BREADS"),
 ("multigrain-bread-mix","MULTIGRAIN BREADS"),("bread-improvers-and-conditioners","IMPROVERS & CONCENTRATES"),
 ("gluten-free-baking-mixes","GLUTEN FREE RANGE"),("natural-confectionery-mixes","CONFECTIONERY MIXES"),
 ("frappe-mixes","FRAPPE MIXES"),("custard-cream-mix","CREAMS AND CUSTARDS"),
 ("imported-cake-baking-essentials","CAKE ESSENTIALS"),("cookie-mixes","COOKIE MIXES"),
 ("egg-free-confectionery-mixes","VEGETARIAN CONFECTIONERY"),("french-baguette-mixes","BAGUETTES"),
 ("bread-decoration-supplier","BREAD DECORS"),("baking-powder-manufacturer-supplier-india","BAKING POWDERS"),
 ("cake-glazes","CAKE GLAZES & JELLIES"),("egg-free-cake-concentrate","CAKE & SPONGE CONCENTRATES"),
 ("bakery-preservatives","PRESERVATIVES"),
]
categories = []
for slug, name in CAT:
    c = {"id": slug, "slug": slug, "name": name, "seo_title": None, "seo_description": None,
         "intro": None, "image_url": None, "products": []}
    if slug == "swissbake-flour":
        c["seo_title"] = "Artisan Flour for Professional Bakeries | Swissbake®"
        c["seo_description"] = "Discover artisan flour by Swissbake® for professional baking. Our bakery flour delivers consistent results in every bake, ideal for bakeries and foodservice. Shop Now!"
        c["intro"] = "Range of well-crafted flours for a wide range of bakery application milled by artisan millers in traditional mills using the finest quality of grains sourced from German, France and other countries."
    categories.append(c)

SOL = [
 ("festive-baking-mixes","FESTIVE BAKING","FESTIVE-OFFERINGS070620021623.png","Discover premium baking ingredients for festive treats! Elevate your holiday baking with our curated selection of fine-quality ingredients"),
 ("for-industrial-baking","FOR INDUSTRIAL BAKING",None,None),
 ("for-frozen-dough","FOR FROZEN DOUGH",None,None),
 ("for-fine-dining","FOR FINE DINING",None,None),
 ("for-pizzerias","FOR PIZZERIAS","FOR-PIZZERIAS070620022520.png","Explore our improvers, premixes, and flours for pizzerias and restaurants! Elevate your artisan pizzas and enhance the customer experience"),
 ("for-cafes-and-restaurants","FOR CAFES & RESTAURANTS",None,None),
 ("for-patissiers","FOR PATISSIERS","FOR-PATISSIERS111124114641.jpg","Discover essential products for patisserie bakers! From premium mixes to top-tier baking tools, ensure perfect pastries, desserts, & confections every time"),
 ("waffle-premix","WAFFLE PREMIX",None,None),("cake-premix","CAKE PREMIX",None,None),
 ("bread-premix","BREAD PREMIX",None,None),
 ("bakery-premix","BAKERY PREMIX",None,"SwissBake® a brand synonymous to premium innovative bakery solutions and bakery ingredients tailored to meet the demands of professional bakers globally. Our extensive range of bakery premixes, bakery mixes and bakery ingredients are designed with precision and expertise for ease of convenience and consistency."),
 ("vanilla-cake-premix","VANILLA CAKE PREMIX",None,None),("chocolate-cake-premix","CHOCOLATE CAKE PREMIX",None,None),
 ("donut-premix","DONUT PREMIX",None,None),("brownie-mix","BROWNIE MIX",None,None),
]
solutions = [{"id": s, "slug": s, "name": n,
              "image_url": ("https://b2b.swissbake.in/images/ProdCategory/" + i) if i else None,
              "intro": d} for s, n, i, d in SOL]
dump("catalog.json", {
 "category_page": {"title": "PRODUCT CATEGORIES",
   "subtitle": "Browse through our wide range of bakery ingredients and solutions.",
   "seo_title": "Bakery Ingredients in India | Bakery Ingredients Manufacturer in India",
   "seo_description": "We are the Manufacturer of Bakery Ingredients in India | Browse through extensive range of bakery ingredients by SwissBake",
   "sidebar_title": "Shop Categories", "empty_products": "Products for this category load from the products API."},
 "solution_page": {"title": "APPLICATION & SERVICES", "subtitle": "Selected grouping of products based on a common application or purpose."},
 "categories": categories, "solutions": solutions})

# ---------------------------------------------------------------- products (names/descriptions captured from public product pages)
P = [
 ("creme-cake-base-vanilla","Vanilla Crème Cake Base Mix","SwissBake® Vanilla Crème Cake Base Mix is a premium, Swiss-formulated solution for preparing rich, dense and moist, textured cake bases, muffins and pound cakes.\n\nSwissBake® Vanilla Crème Cake Mix is an ideal choice for any professional baker looking to bake a range of dense cake bases and muffins.","Refined Wheat Flour, Milk Solids, Natural Identical Flavourings"),
 ("vanilla-sponge-cake-mix","Swiss Bisquit - Vanilla Cake Mix","SwissBake® Swiss Bisquit - Vanilla Cake Mix ensures consistent results every time, offering excellent stability and volume, making it perfect for heavily layered and decorated cakes.",None),
 ("gluten-free-cake-mix","Gluten Free Cake Mix","SwissBake® Gluten Free Cake Mix is a go-to solution for baking exceptional gluten-free cakes and pastries.\n\nOur gluten-free flour for cakes is made from natural ingredients and is designed for ease of use with straightforward baking recipes.\n\nNatural Ingredients: Formulated with natural ingredients for superior taste.\nDedicated Facility: Handled exclusively in our gluten-free facility for guaranteed integrity.\n\nSwissBake® Gluten Free Cake Mix is perfect for professional bakers aiming to offer gluten-free delights that meet the highest standards of taste and texture. Elevate your baking with our expertly crafted gluten free cake mix today.",None),
 ("ghee-creme-cake-mix","Ghee Crème Cake Mix","SwissBake® Ghee Crème Cake Mix brings together Swiss formulation expertise and the traditional richness of ghee—a traditional ingredient deeply rooted in Middle Eastern and South Asian culinary heritage.",None),
 ("cocoa-cake-mix","Crème Cake Mix (Cocoa)","SwissBake® Crème Cake Mix (Cocoa) is a special mix developed by Swiss experts to produce cakes with a dense, moist and creamy texture.\n\nThe complete mix includes all the necessary ingredients in precise measurements, making it easy to use with only the addition of fresh eggs, oil and water.",None),
 ("creme-cake-mix-orange","Crème Cake Mix (Orange)","Infused with essential orange oil & natural colour.\nVersatile application for muffins, tea cakes & pound cakes.\nImparts a refreshing flavour & dense crumb.",None),
 ("butter-creme-cake-mix","Butter Crème Cake Mix","SwissBake® Butter Crème Cake Mix is a high-performance base mix developed for professional bakers seeking consistent quality, rich buttery flavour, and superior crumb matrix.",None),
 ("banana-cake-mix","Banana Cake Mix","SwissBake® Banana Cake Mix is a convenient mix to prepare egg-based banana flavoured sponges and cakes with a delicious taste and mouthfeel.\n\nFormulated with real banana flour, SwissBake® Banana Cake Mix is ideal for a variety of food service businesses.\n\nKey Features\nMade using real banana flour\nDelicious and moist banana cake\nConsistent volume and texture",None),
 ("donut-concentrate","Egg-Free Donut Concentrate 25","SwissBake® Egg-Free Donut Concentrate 25 is a specialized, high-performance concentrate formulated to produce soft, light, and evenly aerated yeast-raised donuts.\n\nIt supports efficient handling, dependable proofing, and standardized finish across a wide range of donut formats.","Bicarbonate, (E450(i)) Disodium Diphosphate], Whey Powder (Cow), Enzyme Blend (Amylase (E1100), Xylanase, derived from plant-fungal sources), Nature Identical Flavouring (Vanilla)."),
 ("vanilla-muffin-premix","Vanilla Muffin Premix","It is simple to use, by just changing the amount of water/oil and using additional ingredients like nuts, chocolate chips etc. you can create a wide variety of muffins that appeal to a range of customers.",None),
 ("creme-cake-mix-vanilla","Crème Cake Mix (Vanilla)","SwissBake® Crème Cake Mix (Vanilla) — see product page for the full description.",None),
]
products = [{"id": s, "slug": s, "name": n, "image_url": "/images/product-placeholder.svg",
             "price": None, "weight_kg": None, "description": d, "key_ingredients": k,
             "category_slug": None} for s, n, d, k in P]
dump("products.json", {"products": products})

# home tabs: seed assignment (placeholder until the real products API is connected)
home = json.loads((OUT / "home.json").read_text(encoding="utf-8"))
tab_slices = {"best-featured": products[0:4], "top-selling": products[4:8], "new-launches": products[8:11]}
for t in home["product_tabs"]:
    t["products"] = tab_slices[t["id"]]
dump("home.json", home)

# ---------------------------------------------------------------- pages
about = {
 "seo_title": "About | Bakery Ingredients Manufacturer in India - Swissbake",
 "title": "About Us", "subtitle": "We provide bakers with innovative solutions to improve the quality and output of their baked products.",
 "why": {"eyebrow": "WHY CHOOSE US", "title": "Finest Swiss formulated bakery ingredients and convenience products",
   "image_url": "https://www.swissbake.in/Content/images/others/About_Us_Who_We_Are.png",
   "paragraphs": [
     "SwissBake® is a brand of premium quality Swiss formulated bakery ingredients and convenience products.",
     "Swiss Bake Ingredients Pvt. Ltd. (India) is the manufacturing and marketing arm of Trade ‘n Bake (Switzerland) and is currently handling the production and distribution of SwissBake® products across Asia & Middle East.",
     "We focus on developing and innovating baking solutions that improve upon the overall product and offerings of our clients.",
     "With a state of art research facility located in Switzerland and strong backward integration covering sourcing, warehousing and logistics; We are well positioned to fulfil the evolving needs and demands of the bakery industry and offer tailor-made bakery solutions with hi-quality ingredients to passionate bakers across the globe."]},
 "vision": {"title": "OUR VISION", "text": "“To be a global leader in developing, producing and supplying bakery ingredients & convenience products.”"},
 "mission": {"title": "OUR MISSION", "text": "“To provide authentic, natural and healthy baking solutions and convenience products to bakers around the globe.”"},
 "legacy": {"title": "OUR LEGACY", "subtitle": "Over 40 years of experience in developing baking solutions for the global bakery industry.",
   "image_url": "https://www.swissbake.in/content/images/others/About_us_Our_Legacy.jpg",
   "paragraphs": [
     "Trade ‘n Bake (Switzerland) has a rich and varied experience of over 40 years in developing and customizing bakery solutions for clients across the globe.",
     "Trade ‘n Bake team of experienced cereal scientists, food technologists and baking experts have spent years in researching and developing bakery products to suit the evolving needs of the bakery industry. Their technical expertise in recipe formulation has been pivotal in developing SwissBake® range of fine bakery ingredients.",
     "Swiss Bake Ingredients Pvt. Ltd. the manufacturing partner of Trade ‘n Bake, is a part of RAS Group of companies. They represents a heritage of over 30 years in cereal milling and flour technology which is driven by close relationship with farmers and suppliers directly. RAS groups primary role is to manage and optimize the supply chain in order to efficiently produce and market SwissBake® products across Asia and Middle East"]},
 "quality": {"title": "QUALITY PROMISE", "subtitle": "True to our Swiss heritage, we maintain highest quality standards through all stages of our business operations to ensure uncompromised service to our clients.",
   "image_url": "https://www.swissbake.in/Content/images/sbimg/Swiss2.png",
   "paragraphs": [
     "Providing high quality products is fundamental to our success. We have always recognized this and have therefore encouraged our employees to maintain a quality conscious culture.",
     "We believe accreditation of raw material suppliers, following global production standards and efficient management systems are vital in order to deliver quality products consistently. Hence we have not only supported the development and application of improved practices but we also seek to be a leader in the utilization of such systems.",
     "For us, customer satisfaction is of utmost importance and our experts are always available for guiding our clients whenever they are needed."]},
 "clients": {"title": "OUR CLIENTS", "subtitle": "We are proud to be serving these reputed establishments globally.",
   "logos": [{"name": f"Client {i}", "image_url": f"https://www.swissbake.in/Content/images/sbclients/client{i}.{'png' if i <= 6 else 'jpg'}"} for i in range(1, 14)]},
}
contact = {
 "seo_title": "Contact | Bakery Ingredients Manufacturer in India - Swissbake",
 "title": "Contact Us", "subtitle": "Have any Questions? Here’s how you can get in touch with us.",
 "intro": "We continuously work together with our customers and channel partners to create innovative bakery solutions tailored to meet their changing needs and market demands.",
 "form": {"title": "SEND US A MESSAGE", "state_placeholder": "--State--", "submit_label": "Submit",
   "states": ["Andaman and Nicobar Islands","Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chandigarh","Chhattisgarh","Dadra and Nagar Haveli","Daman and Diu","Delhi","Goa","Gujarat","Haryana","Himachal Pradesh","Jammu and Kashmir","Jharkhand","Karnataka","Kenmore","Kerala","Lakshadweep","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Narora","Natwar","Odisha","Paschim Medinipur","Pondicherry","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","Vaishali","West Bengal"]},
 "map_embed_url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.53322642813!2d72.81787777593482!3d18.99621105447114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce85f4252103%3A0x363347e053bd9707!2sSwiss%20Bake%20Ingredients%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1725951561208!5m2!1sen!2sin",
 "offices": [
   {"title": "ASIA & MIDDLE EAST", "address": "Manjrekar Lane, Dr.E.Moses Road, Worli, Mumbai Maharashtra, India", "email": "support@swissbake.in", "website_label": "www.swissbake.in", "website_url": "http://www.swissbake.in/"},
   {"title": "UK & EUROPEAN UNION", "address": "Junkerschlossweg 9, 4465 Hemmiken Basel-Landschaft, Switzerland", "email": "support@swissbake.in", "website_label": "www.swissbake.ch", "website_url": "http://www.swissbake.ch/"}],
 "support": {"title": "CUSTOMER SUPPORT", "phones": [
   {"label": "+91 022 3529 3529", "whatsapp": "917447331888"}, {"label": "+91 98920 53259", "whatsapp": "919892053259"}], "email": "support@swissbake.in"},
 "follow": {"title": "FOLLOW US", "links": [
   {"network": "facebook", "url": "https://www.facebook.com/swissbakemix"},
   {"network": "twitter", "url": "https://twitter.com/swissbakemix"},
   {"network": "linkedin", "url": "https://www.linkedin.com/company/3689822?trk=prof-0-ovw-prev_pos"}]},
}
baker = {
 "seo_title": "Baker Support | Swissbake",
 "title": "BAKER SERVICE & SUPPORT", "subtitle": "Facing any baking challenges ? Get guidance from our team of technical experts & advisors.",
 "services": {"title": "OUR SERVICES", "quote": "\"Share with us your baking concerns /queries so that our team of experts can guide you with the appropriate solution.\"",
   "items": [
     {"title": "INNOVATIVE INGREDIENTS", "text": "Our experts continuously work on researching new bakery ingredients and are well updated on global bakery trends. This helps us to offer the latest and most innovative products in the bakery segment to our customers."},
     {"title": "CUSTOMER COLLABORATION", "text": "We work closely with bakers and our clients to formulate and manufacture products that cater to the specific demands of their respective markets and enable them to thrive and grow in today’s highly competitive market conditions."},
     {"title": "TECHNICAL SUPPORT", "text": "Our team of experts can to provide support to our clients in the area of baking process, equipment selection, material sourcing and product formulation in order to optimise or improver their end results."}]},
 "form": {"title": "BAKER SUPPORT", "subtitle": "Reach out to us in order to get guidance, opinions and suggestions on your baking needs and challenges from our team of technical and professional bakers",
   "image_url": "https://www.swissbake.in/content/images/Baker_Support_Inside.png",
   "fields": {"name": "YOUR NAME", "company": "COMPANY NAME", "country": "COUNTRY", "email": "EMAIL ID", "phone": "CONTACT NO."},
   "tabs": [
     {"id": "query", "label": "BAKING QUERY / TIP REQUIRED", "fields": [
        {"id": "product", "label": "PRODUCT DETAIL OR RECIPE", "type": "text"},
        {"id": "details", "label": "DESCRIBE THE QUERY / REQUIREMENT IN DETAIL", "type": "textarea", "max": 500}]},
     {"id": "project", "label": "NEW PROJECT OR CUSTOMIZED SOLUTION", "fields": [
        {"id": "product", "label": "PRODUCT BEING BAKED", "type": "text"},
        {"id": "swissbake_product", "label": "SWISS BAKE PRODUCT NAME", "type": "text"},
        {"id": "details", "label": "DESCRIBE THE PROJECT OR REQUIRED SOLUTION IN DETAIL", "type": "textarea", "max": 500},
        {"id": "monthly", "label": "ESTIMATED MONTHLY REQUIREMENT", "type": "textarea", "max": 500},
        {"id": "timeline", "label": "TIME DURATION FOR US TO DEVELOP THE SOLUTION", "type": "textarea", "max": 500}]}],
   "submit_label": "SEND"},
}
def sec(h, *paras): return {"heading": h, "paragraphs": list(paras)}
legal = {
 "privacy-policy": {"seo_title": "Privacy | Bakery Ingredients Manufacturer in India - Swissbake", "title": "Privacy Policy", "breadcrumb": "PRIVACY POLICY", "sections": [
  sec(None, "Swiss Bake Ingredients Pvt. Ltd. recognises the importance of maintaining your privacy. We value your privacy and appreciate your trust in us. This Privacy Policy applies to current and former visitors to our website and to our online customers. By visiting and/or using our website, you agree to this Privacy Policy. This Privacy Policy explains the information practices that apply to personally identifiable information that we collect about you as an individual, when you visit and/or use our website. Any information that we collect about you while you are visiting or using our website will be handled in accordance with this Privacy Policy and will not be shared except in accordance with this Privacy Policy. This Privacy Policy does not apply to information about you collected by our affiliates or third party websites that may post links or advertisements on or otherwise be accessible from our website www.swissbake.in. The information collected by these affiliates or third party websites is subject to their own privacy policies.",
   "This section of our Privacy Policy describes the categories of information collected by our website www.swissbake.in. You have the option not to provide information, however, withholding information may prevent you from being able to use some of our website features."),
  sec("INFORMATION COLLECTED AUTOMATICALLY:", "Whenever you visit our website, we automatically collect some information about your transactions with us, and your use of our website. For example, we automatically collect your IP address, for our internal use only, such as to help us diagnose problems with our server and administer our website. We also automatically track certain information about your activities on our website such as the type of web browser you are using and click stream data. If you are a registered customer on our website www.swissbake.in, we link this automatically-collected data to the personally identifiable information we collect about you described below. We use this information to do internal research on your interests and to help us better understand and serve you."),
  sec("INFORMATION YOU SEND TO US:", "If you choose to provide us with Personal Information, such as by sending us an e-mail or by filling out a form with your Personal Information and submitting it to us through our Website, we collect the Personal Information that you provide to us. For example, if you register or sign up for an account with us, we collect your name, e-mail address, telephone number and password. If you place an order with us, we collect the Personal Information that you provide to us such as your shipping, billing, and payment information. From time-to-time you may be given the opportunity to participate in contests or surveys on our Website. If you participate, we will request certain Personal Information from you. Participation in these surveys or contests is completely voluntary and you therefore have a choice whether or not to disclose the requested information. In addition, we collect your order information and purchase and payment history."),
  sec("COOKIES AND SIMILAR FILES:", "Our Website uses “cookies” and files that are similar to cookies. Cookies are alphanumeric identifiers created by your browser at our request and stored in an approved and standardized place on your computer. By transferring these cookies, we assigns you a unique customer code and record locater. Information about your activity on our website can then be included in your customer record, which is stored within the website firewall. When you visit or return to our Website, we read the cookie to identify you as one of our customers and help recall orders or preferences you have selected. The cookie also enables us to recall your past activities, post your account data, and tailor site elements and special offers to you. No Personal Information about you is stored on the cookie. Most Web browsers accept cookies by default, but allow users to reject cookies by changing the browser preferences. If you have set up your browser to reject cookies, some aspects of our Website, including our Shopping Cart, will not work properly."),
  sec("USE AND DISCLOSURE OF INFORMATION:", "We use the information that we collect about you to maintain, improve, and administer our website, operate our business, provide products and services that you request, administer your account, inform you about products and services that might be of interest to you, and personalise your online experience. In order to carry out certain business functions, such as order fulfilment, e-mail delivery, or marketing, we sometimes hire other companies to perform services on our behalf. We may disclose personally identifiable information that we collect about you to these companies to enable them to perform these services, but they are required to safeguard the data and are not authorised to use it for any other purpose than completing their contractual requirements. For example, as a part of the normal process of completing your purchase, We may provide your personal data to a third party payment processor, such as PayTM, depending on your chosen method of payment. Please be aware that, because of the limitations of the systems used by some financial institutions, the statement you receive from your credit card or financial institution may show the name of a third party payment processor, such as DirectPay Ltd., instead of or inaddition to the SwissBake® name. In addition, we may share the information we collect with other companies with whom we have joint marketing arrangements. We may also disclose information, including personal information, we collect about you in other circumstances as required or permitted by law."),
  sec("LINKS TO THIRD PARTY PRODUCTS AND SERVICES:", "While you are visiting or using the website www.swissbake.in, you may be presented with an opportunity to purchase third party products or services. These products and services are offered and supplied by independent companies not owned or operated by us. If you click on one of the presented offers, you will be redirected to the site of the third party, and any information you provide in response to the offer will be collected and used by the third party and not by us. Information you provide to the third party and any dealings you have with the third party will be governed by the privacy and other policies of that third party."),
  sec("WEBSITE SECURITY:", "We maintain physical, electronic, and procedural safeguards designed to help us protect your non-public personal information. For example, we use Secure Socket Layer (SSL) technology to encrypt your credit card information when you purchase products through our website. When you establish an account at www.swissbake.in, you choose a password to help protect your account information. A password is only as strong as you make it: you should select a unique password and keep it safe.")]},
 "terms-of-use": {"seo_title": "Term Of Use | Bakery Ingredients Manufacturer in India - Swissbake", "title": "Terms Of Use", "breadcrumb": "TERMS OF USE", "sections": [
  sec(None, "Welcome to www.swissbake.in (the \"Website\"). This Website is owned and operated by Swiss Bake Ingredients Pvt. Ltd. You understand that your use of this Website constitutes your consent to, and agreement to, abide by the most current version of these terms and conditions (the \"Terms\"). We may at any time revise these terms and conditions by updating the Terms. You agree to be bound by subsequent revisions and agree to review the Terms periodically for changes to the terms and conditions. The most up to date version of the Terms will always be available for your review under the \"Terms of Use\" link that appears at the bottom of the Website."),
  sec("DISCLAIMER", "1. All product pictures are for representational purposes only. Actual products may differ from pictures.", "2. Swiss Bake Ingredients Pvt. Ltd does not warrant that product descriptions on the Websites are accurate, complete, reliable, current, or error-free. If a product offered by Swiss Bake Ingredients Pvt. Ltd itself is not as described, your sole remedy is to return it promptly in unused condition.", "3. Unless explicitly stated, Swiss Bake Ingredients Pvt. Ltd is the manufacturer of products listed on the website. All products are manufactured and packaged by Swiss Bake Ingredients Pvt. Ltd.", "4. While our product descriptions are descriptive, we urge all consumers to read the label of the product carefully before use", "5. Swiss Bake Ingredients Pvt. Ltd is liable in case the product that reaches you is beyond its expiry date or if the packaging is damaged.", "6. While we try our best to ensure delivery of products within 6-10 days, there be some delays in event of unforeseen circumstances."),
  sec("IDENTIFICATION", "You agree to indemnify and hold Swiss Bake Ingredients Pvt. Ltd and its affiliates, officers, directors, members, shareholders, agents, employees, and licensors harmless from any claim or demand, including attorneys' fees, made by any third party arising out of your violation of these Terms."),
  sec("MODIFICATIONS TO THE WEBSITE", "Swiss Bake Ingredients Pvt. Ltd reserves the right to modify or discontinue, temporarily or permanently, all or any portion of the Websites with or without notice. You agree that Swiss Bake Ingredients Pvt. Ltd will not be liable to you or to any third party for any such modification, suspension or discontinuance.")]},
 "shipping-policy": {"seo_title": "Shipping | Bakery Ingredients Manufacturer in India - Swissbake", "title": "Shipping Policy", "breadcrumb": "SHIPPING POLICY", "sections": [
  sec(None, "SwissBake® utilizes third-party shipping services for all purchases made through our website, www.swissbake.in. We do not permit customers to personally collect their orders from our warehouse or office."),
  sec("Shipping Charges", "Shipping charges are applicable on all shipments and may vary based on the state, pin code, and order quantity. A minimum shipping charge of INR 600 is applicable to all orders. Additional Out of Delivery Area (ODA) charges may be incurred for pin codes outside our regular serviceable regions. Information regarding these additional charges may not be available at the time of order placement but will be communicated to the customer prior to order confirmation. Additional handling and warehousing charges may also apply on a case-to-case basis."),
  sec("Serviceable Areas", "SwissBake®, through our shipping partners, currently services over 11,000 pin codes across India. However, we do not ship to any pin codes in the Andaman & Nicobar Islands and Lakshadweep Islands. Pin codes outside our serviceable area fall under the ODA category, for which additional freight charges of up to INR 1,500 may apply. These ODA charges may not be added to the order at the time of placement; a company representative will contact you to revise the order if such charges are applicable. During lockdown situations or other restrictions, service to some sectors and pin codes may be limited;please check with our support team to confirm whether your pin code is serviceable."),
  sec("Delivery Time", "Under normal operating conditions: - All materials in stock are shipped within 2 working days after payment confirmation. - Payment verification may take up to 3 working days depending on the mode of payment. - Shipping transit time varies based on distance from our warehouses. - Average delivery times range from 4-10 working days (excluding Sundays and bank holidays) from the dispatch date. - Delivery times may exceed in special situations or for pin codes that fall into infrequent service areas. - Deliveries can be tracked in real-time using the tracking details provided by us."),
  sec("Payment Policy", "The following standard payment options are available at the time of order placement: - Credit/Debit Card - Net Banking - Bank Transfer Additional options such as payment via cheque or purchase against credit may be provided based on contractual terms."),
  sec("Return Policy", "Returns are accepted only for materials found defective at the time of delivery or delivered in a damaged condition. For return claims: - Contact our support team via email (support@swissbake.in) or at our customer support number +91 22 3529 3539. - Once return claims are accepted, Swiss Bake Ingredients Pvt Ltd. will bear the cost of return and replace the product at the earliest."),
  sec("Transit Damages", "In rare events where materials may be damaged during transit: - It is required that a mention of the damage has been made on the Proof of Delivery (POD)/Lorry Receipt (LR) copy. - Photos of damaged product packets along with LR/POD mentioning damage and details should be sent to our support email id support@swissbake.in within 72 hours (3 working days) of delivery for further processing."),
  sec("Replacement / Refund Policy", "Payments made against goods ordered from www.swissbake.in are not eligible for cash refunds. Replacements are subject to evaluation on a case-to-case basis. Any product replacement request or returns sent due to quality or damage-related issues will be reviewed and responded to within 5-7 working days of receipt of products/complaints. Replacement for all acceptable claims will be made within 12-15 working days subject to approval after review under normal operating conditions. For any queries regarding this policy, please contact our customer care number +91 22 3529 3539 or email us at support@swissbake.in."),
  sec("Force Majeure", "Swiss Bake Ingredients Pvt. Ltd. shall not be liable for any failure or delay in performing its obligations under this Shipping Policy if such failure or delay is caused by circumstances beyond its reasonable control, including but not limited to natural disasters, civil unrest, government actions, technical failures, or other unforeseen events."),
  sec("Governing Law and Jurisdiction", "This Shipping Policy shall be governed by and construed in accordance with the laws of India. Any disputes arising out of this policy shall be subject to the exclusive jurisdiction of the courts in Mumbai."),
  sec("Changes to Shipping Policy", "SwissBake® reserves the right to modify this Shipping Policy at any time without prior notice. Changes will be effective immediately upon posting on our website."),
  sec(None, "For any queries related to this Shipping Policy or your order status, please contact our customer support team via email at support@swissbake.in or call us at +91 22 3529 3539.")]},
}
dynamic = {
 "recipe": {"seo_title": "Recipe | Bakery Ingredients Manufacturer in India - Swissbake", "title": "BAKER RECIPE",
            "subtitle": "Knowledge base of baker recipes created by our baking experts to amplify your baking possibilities.",
            "empty": "NO RECIPE FOUND", "recipes": []},
 "faq": {"seo_title": "FAQ | Bakery Ingredients Manufacturer in India - Swissbake", "title": "FAQ’s",
         "subtitle": "Here you can find answers to or request solutions for your concerns related to our company and products.",
         "empty": "NO FAQ FOUND", "categories": [], "faqs": []},
}
auth = {
 "login": {"title": "Login", "subtitle": "Existing customers sign in to manage orders, invoices and your account.",
   "email": "Email ID", "password": "Password", "submit": "Login Now", "alt_text": "New to swissbake?", "alt_link": {"label": "Create Account", "url": "/register"}},
 "register": {"title": "Create Account", "subtitle": "Register now for unrestricted access to SwissBake® products, pricing and ordering.",
   "fields": {"name": "Your Name", "company": "Company Name", "email": "Email ID", "phone": "Contact No.", "password": "Password"},
   "submit": "Create Account", "alt_text": "Already have an account?", "alt_link": {"label": "Login Now", "url": "/login"}},
}
dump("pages.json", {"about": about, "contact": contact, "baker_support": baker, "legal": legal, "dynamic": dynamic, "auth": auth})
print("done")
