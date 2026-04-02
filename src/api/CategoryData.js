import CardsImage from "../assets/images/E-giftCards.png"
import womenImage from "../assets/images/women.png"
import menImage from "../assets/images/men.png"
import kidsImage from "../assets/images/kids.png"

export const CategoryData = [
    {
        id:1,
        name:"WOMEN",
        link: "/women",
        Image: womenImage,
    },
    {
        id:2,
        name:"MEN",
        link: "/men",
        Image: menImage,
    },
    {
        id:3,
        name:"KIDS",
        link: "/kids",
        Image: kidsImage,
    },
    {
        id:4,
        name:"E-GIFT",
        link: "/discover",
        Image: CardsImage,
        description: "Surprise someone with the gift they really want.", // Add this
        btn: "DISCOVER MORE"
    },
]