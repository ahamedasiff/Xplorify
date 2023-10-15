const searchFoods = [
    {
        id: '1',
        name: 'Spicy Garlic Noodles',
        type: 'Chinese',
        price: 20,
        image: { uri: ('https://lindseyeatsla.com/wp-content/uploads/2021/11/LindseyEats_Spicy_Garlic_Noodles-3.jpg') },
        details: 'Spicy Garlic Noodles are a flavorful and indulgent dish characterized by tender egg noodles tossed in a spicy and aromatic garlic sauce. This dish typically combines the heat of red chili flakes or chili oil with the pungent and savory flavors of minced garlic. It is a popular Asian-inspired noodle dish that offers a delightful balance of spice and umami, making it a favorite for those who enjoy bold and zesty flavors. Spicy Garlic Noodles can be customized with various toppings such as vegetables, protein (like shrimp or chicken), and herbs to suit individual preferences, making it a versatile and satisfying meal.',
        location: [
            latitude = 6.9267378440439735, // Replace with the latitude of your specific location
            longitude = 79.86535683456795,
            uri = ('https://lh5.googleusercontent.com/p/AF1QipPJELGPvAuoMVfJDhI4vAwXc8qXXev7rtFcTbfi=w408-h274-k-no')]//6.9267378440439735, 79.86535683456795

    },
    {
        id: '2',
        name: 'Biriyani',
        type: 'Indian',
        price: 45,
        image: { uri: ('https://www.unileverfoodsolutions.lk/dam/global-ufs/mcos/meps/sri-lanka/calcmenu/recipes/LK-recipes/general/nasi-biriyani/main-header.jpg') },
        details: 'Biryani is a beloved South Asian rice dish, renowned for its exquisite blend of aromatic spices, tender meat (such as chicken, mutton, or beef), or vegetables, all layered with fragrant, long-grain basmati rice. This culinary masterpiece is a symphony of flavors, where spices like cardamom, cinnamon, and saffron come together to create a harmonious and delicious melody. Garnished with fried onions, fresh herbs, and sometimes boiled eggs, biryani is a celebratory dish cherished for its complexity of taste and cultural significance, often gracing festive tables and special occasions across the Indian subcontinent and beyond.',
        location: [
            latitude = 6.904811162210102, // 6.904811162210102, 79.95249365827819
            longitude = 79.95249365827819,
            uri = ('https://lh5.googleusercontent.com/p/AF1QipMX6P-n1gKBJEzQrds0jahxkvG_u0_a81-Wz3xK=s387-k-no')]
    },
    {
        id: '3',
        name: 'Vegetarian Burritos ',
        type: 'Mexican Cuisine',
        price: 15,
        image: { uri: ('https://www.mexicanplease.com/wp-content/uploads/2022/06/Vegetarian-Breakfast-Burritos-11.jpg') },
        details: 'Vegetarian burritos are a delicious and satisfying Mexican-inspired dish that consists of a tortilla wrap filled with a variety of vegetarian ingredients. These ingredients often include cooked rice, beans (such as black beans or pinto beans), sautéed or grilled vegetables (like bell peppers, onions, and zucchini), cheese, salsa, guacamole, and sour cream.'
        , location: [
            latitude = 6.904834270669651, // 6.904834270669651, 79.9518797545788
            longitude = 79.9518797545788,
            uri = ('https://lh5.googleusercontent.com/p/AF1QipPQxVJ8kNS18weA3YC9fo4Cgbk1Hxi2Di21z_lk=w203-h100-k-no-pi-10-ya26.960016-ro-0-fo100')]
    },
    {
        id: '4',
        name: 'Creamy Boursin Pasta',
        type: 'Italian Cuisine',
        price: 30,
        image: { uri: ('https://thedizzycook.com/wp-content/uploads/2019/12/Boursin-pasta.jpg') },
        details: 'Creamy Boursin Pasta - is a delectable pasta dish characterized by a luscious and velvety sauce made with Boursin cheese. This dish combines perfectly cooked pasta with the rich and creamy Boursin cheese, resulting in a harmonious blend of flavors. Boursin cheese, known for its garlic and herb infusion, infuses the pasta with a delightful combination of creamy texture and savory, aromatic notes. Itis a quick and easy yet indulgent meal that is sure to satisfy your cravings for a creamy pasta delight.',
        location: [
            latitude = 6.9069342448316355, //6.9069342448316355, 79.97153652698803
            longitude = 79.97153652698803,
            uri = ('https://lh5.googleusercontent.com/p/AF1QipM9GkVVTmcxNGpeO7BmY4Wj3jPEYwe4kVgdxmXS=w408-h408-k-no')]
    },
    {
        id: '5',
        name: 'Chicken Alfredo',
        type: 'Italian-American Pasta ',
        price: 25,
        image: { uri: ('https://hips.hearstapps.com/hmg-prod/images/chicken-alfredo-index-64ee1026c82a9.jpg?crop=0.9994472084024323xw:1xh;center,top&resize=1200:*') },
        details: 'Chicken Alfredo is a classic Italian-American pasta dish that consists of tender pieces of chicken served over fettuccine pasta, all coated in a rich and creamy Alfredo sauce. The sauce is typically made with butter, heavy cream, garlic, and Parmesan cheese, creating a velvety and indulgent texture. It is a comforting and decadent dish known for its creamy, cheesy, and savory flavors, often garnished with parsley and additional grated Parmesan cheese.'
        , location: [
            latitude = 6.9046571792741736, // 6.9046571792741736, 79.95473933367313
            longitude = 79.95473933367313,
            uri = ('https://lh5.googleusercontent.com/p/AF1QipOmbu6m-KRgDAtuuv4-rsgyOcSb1fXOlZeFATHU=w101-h72-n-k-no-nu')]

    },
    {
        id: '6',
        name: 'Margherita Pizza',
        type: 'Italian Pizza',
        price: 45,
        image: { uri: ('https://static.toiimg.com/thumb/56868564.cms?width=1200&height=900') },
        details: 'Margherita Pizza is a classic Italian pizza known for its simplicity and vibrant flavors. It features a thin crust topped with three basic ingredients: ripe tomatoes, fresh mozzarella cheese, and fragrant basil leaves. The combination of these elements results in a harmonious and delicious dish. The tomato sauce represents the red of the Italian flag, the mozzarella cheese adds creaminess, and the basil leaves contribute a burst of aromatic freshness. Margherita Pizza is a timeless favorite and a symbol of authentic Italian pizza craftsmanship.'
        , location: [
            latitude = 6.906530864531055, // 6.906530864531055, 79.95012272080791
            longitude = 79.95012272080791,
            uri = ('https://lh5.googleusercontent.com/p/AF1QipMThmrL_mDkogCTZeylKSLiDGwnVvByASPHXK9K=w408-h286-k-no')]

    },
    {
        id: '7',
        name: 'Cheese Sandwich  ',
        type: 'American Cuisine',
        price: 15,
        image: { uri: ('https://assets.epicurious.com/photos/59b2bccaed60845e59e6d3d1/4:3/w_4992,h_3744,c_limit/shutterstock_321217517.jpg') },
        details: 'A Grilled Cheese Sandwich is a classic comfort food made by placing slices of cheese between two slices of bread, then grilling or toasting the sandwich until the bread is crispy and the cheese melts, creating a warm and gooey filling. It is a simple yet satisfying dish loved by people of all ages, often served with tomato soup or as a quick and delicious snack or meal.'
        , location: [
            latitude = 6.900720934023799, // 6.900720934023799, 79.95710112884535
            longitude = 79.95710112884535,
            uri = ('https://lh5.googleusercontent.com/p/AF1QipMkOyaCII1n3GxuB-47FFRTsjZgxLA-c382oQ3R=w408-h541-k-no')]

    },
    {
        id: '8',
        name: 'Caprese Salad',
        type: 'Italian ',
        price: 20,
        image: { uri: ('https://www.cubesnjuliennes.com/wp-content/uploads/2022/08/Caprese-Salad-Recipe.jpg') },
        details: 'The salad is often drizzled with extra-virgin olive oil, seasoned with salt and pepper, and sometimes finished with a balsamic vinegar reduction for an extra burst of flavor. Caprese Salad is not only visually appealing with its red, white, and green color palette (resembling the Italian flag) but also delights the palate with its harmonious combination of ingredients. It is a perfect appetizer or side dish, particularly during the summer months when tomatoes and basil are at their peak freshness.'
        , location: [
            latitude = 6.906303007856024, //  6.906303007856024, 79.96420179997583
            longitude = 79.96420179997583,
            uri = ('https://lh5.googleusercontent.com/p/AF1QipNh3IzhAwRywfJN23MsZs51RbrModb8192-BN_c=w408-h306-k-no')]

    },

];

export default searchFoods;