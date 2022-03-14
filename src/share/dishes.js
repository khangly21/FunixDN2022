       
    //do không tạo React project bằng lệnh create-react-app nên không cần import export
    //nếu ghi export const DISHES thì Error: exports not defined  
       const DISHES = 
    [
        {
            id: 0,
            name:'Uthappizza',
            image: '../../public/assets/images/uthappizza.png',
            category: 'mains',
            label:'Hot',
            price:'4.99',
            description:'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
            comments: [
                {
                id: 0,
                rating: 5,
                comment: "Comment 0-1: Imagine all the eatables, living in conFusion!",
                author: "John Lemon",
                date: "2012-10-16T17:57:28.556094Z"
                },
                {
                id: 1,
                rating: 4,
                comment: "Comment 0-2: Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
                author: "Paul McVites",
                date: "2014-09-05T17:57:28.556094Z"
                },
                {
                id: 2,
                rating: 3,
                comment: "Comment 0-3: Eat it, just eat it!",
                author: "Michael Jaikishan",
                date: "2015-02-13T17:57:28.556094Z"
                },
                {
                id: 3,
                rating: 4,
                comment: " Comment 0-4: Ultimate, Reaching for the stars!",
                author: "Ringo Starry",
                date: "2013-12-02T17:57:28.556094Z"
                },
                {
                id: 4,
                rating: 2,
                comment: " Comment 0-5: It's your birthday, we're gonna party!",
                author: "25 Cent",
                date: "2011-12-02T17:57:28.556094Z"
                }
            ]                        
        },

        {
            id: 1,
            name:'Zucchipakoda',
            image: '../../public/assets/images/zucchipakoda.png',
            category: 'appetizer',
            label:'',
            price:'1.99',
            description:'Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a sweet-tangy tamarind sauce',
            comments: [
                {
                id: 0,
                rating: 5,
                comment: "Comment 1-1: Imagine all the eatables, living in conFusion!",
                author: "John Lemon",
                date: "2012-10-16T17:57:28.556094Z"
                },
                {
                id: 1,
                rating: 4,
                comment: "Comment 1-2: Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
                author: "Paul McVites",
                date: "2014-09-05T17:57:28.556094Z"
                },
                {
                id: 2,
                rating: 3,
                comment: "Comment 1-3: Eat it, just eat it!",
                author: "Michael Jaikishan",
                date: "2015-02-13T17:57:28.556094Z"
                },
                {
                id: 3,
                rating: 4,
                comment: "Comment 1-4: Ultimate, Reaching for the stars!",
                author: "Ringo Starry",
                date: "2013-12-02T17:57:28.556094Z"
                },
                {
                id: 4,
                rating: 2,
                comment: " Comment 1-5: It's your birthday, we're gonna party!",
                author: "25 Cent",
                date: "2011-12-02T17:57:28.556094Z"
                }
            ]
            },
            {
            id: 2,
            name:'Vadonut',
            image: '../../public/assets/images/vadonut.png',
            category: 'appetizer',
            label:'New',
            price:'1.99',
            description:'A quintessential ConFusion experience, is it a vada or is it a donut?',
            comments: [
                {
                id: 0,
                rating: 5,
                comment: "Comment 2-1: Imagine all the eatables, living in conFusion!",
                author: "John Lemon",
                date: "2012-10-16T17:57:28.556094Z"
                },
                {
                id: 1,
                rating: 4,
                comment: "Comment 2-2:Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
                author: "Paul McVites",
                date: "2014-09-05T17:57:28.556094Z"
                },
                {
                id: 2,
                rating: 3,
                comment: "Comment 2-3:Eat it, just eat it!",
                author: "Michael Jaikishan",
                date: "2015-02-13T17:57:28.556094Z"
                },
                {
                id: 3,
                rating: 4,
                comment: "Comment 2-4:Ultimate, Reaching for the stars!",
                author: "Ringo Starry",
                date: "2013-12-02T17:57:28.556094Z"
                },
                {
                id: 4,
                rating: 2,
                comment: "Comment 2-5:It's your birthday, we're gonna party!",
                author: "25 Cent",
                date: "2011-12-02T17:57:28.556094Z"
                }
            ]
        },

        {
            id: 3,
            name:'ElaiCheese Cake',
            image: '../../public/assets/images/elaicheesecake.png',
            category: 'dessert',
            label:'',
            price:'2.99',
            description:'A delectable, semi-sweet New York Style Cheese Cake, with Graham cracker crust and spiced with Indian cardamoms',
            comments: [
                {
                id: 0,
                rating: 5,
                comment: "Comment 3-1: Imagine all the eatables, living in conFusion!",
                author: "John Lemon",
                date: "2012-10-16T17:57:28.556094Z"
                },
                {
                id: 1,
                rating: 4,
                comment: "Comment 3-2:Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
                author: "Paul McVites",
                date: "2014-09-05T17:57:28.556094Z"
                },
                {
                id: 2,
                rating: 3,
                comment: "Comment 3-3:Eat it, just eat it!",
                author: "Michael Jaikishan",
                date: "2015-02-13T17:57:28.556094Z"
                },
                {
                id: 3,
                rating: 4,
                comment: "Comment 3-4:Ultimate, Reaching for the stars!",
                author: "Ringo Starry",
                date: "2013-12-02T17:57:28.556094Z"
                },
                {
                id: 4,
                rating: 2,
                comment: "Comment 3-5:It's your birthday, we're gonna party!",
                author: "25 Cent",
                date: "2011-12-02T17:57:28.556094Z"
                }
            ]
        }
    ];