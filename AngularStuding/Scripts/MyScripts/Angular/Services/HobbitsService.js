app.factory("hobbitsService", function ($http) {
    var hobbitsService = {
        async: function () {
            var promise = $http.post("Hobbit/GetHobbits").then(function (response) {
                return response.data;
            });

            return promise;
        }
    };

    return hobbitsService;
});


//hobbits: [
//{ Id: 0, Name: "Merry", Age: 34, Weapon: "Sword", Photo: "Content/Images/merry.jpg", Info: "Frodo and Merry are first cousins once removed. Their common ancestors are Gorbadoc Brandybuck and Mirabella Took Brandybuck. Merry was born T.A. 2982 (or, in the Shire-reckoning, in 1382), in Buckland. He is the only child of Saradoc Brandybuck (T.A. 2940-F.A. 11), who was a Master of Buckland, and Esmeralda Brandybuck (née Took) (T.A. 2936- ?), the younger sister of Paladin Took II (T.A. 2933–3034), making him first cousin to Paladin's son Peregrin Took. (See The Lord of the Rings, Appendix C.)" },
//{ Id: 1, Name: "Pippin", Age: 30, Weapon: "Sword", Photo: "Content/Images/pippin.jpg", Info: "Peregrin was the only son and heir of Paladin Took II, the Thain of the Shire. His best friend Meriadoc Brandybuck, more commonly known as Merry, was his cousin; another good friend was Frodo Baggins. Peregrin means traveller in strange countries. Pippin indeed saw much more of Middle-earth than most Hobbits: he journeyed with Frodo and the Fellowship of the Ring, and fought in the War of the Ring. Late in life he travelled again to the kingdoms of Rohan and Gondor. Pippin's hair colour is mentioned as almost golden in The History of Middle-earth, vol. IX, Sauron Defeated, through the eyes of Pippin Gamgee.[2] In the later drafts of this same section Tolkien omitted this statement, leaving the reader to envisage Pippin's appearance." },
//{ Id: 2, Name: "Sam", Age: 33, Weapon: "Rope", Photo: "Content/Images/sam.jpg", Info: "At the start of The Lord of the Rings Sam, typically for a hobbit, had never before ventured far from the immediate area where he lived. Unusually for a hobbit, however, since childhood Sam was fond of legends and other fantastical stories. Sam was particularly interested in the Elves, and always hoped to one day see one. Sam was literate, having been taught by Bilbo and Frodo, which was unusual for most hobbits given to their rustic culture. Sam often showed a talent for poetry; after Gandalf's apparent death, Sam added to the poem that Frodo had written about him." },
//{ Id: 3, Name: "Frodo", Age: 25, Weapon: "Sword", Photo: "Content/Images/frodo.jpg", Info: "Frodo did not appear until the third draft of A Long-Expected Party (the first chapter of The Lord of the Rings), when he was named Bingo (after a family of toy koala owned by Tolkien's children), son of Bilbo Baggins and Primula Brandybuck. In the fourth draft, he was renamed Bingo Bolger-Baggins, son of Rollo Bolger and Primula Brandybuck. Tolkien did not change the name to Frodo until the third phase of writing, when much of the narrative, as far as the hobbits' arrival in Rivendell, had already taken shape. Prior to this, the name Frodo had been used for the character who eventually became Peregrin Took." }
//]