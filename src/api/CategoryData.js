import CardsImage from "../assets/images/E-giftCards.jpg"
import womenImage from "../assets/images/women.png"
import menImage from "../assets/images/men.png"
import kidsImage from "../assets/images/kids.png"

// All category cards point to the main shop page (no separate category routes exist yet)
export const CategoryData = [
    {
        id:1,
        name:"WOMEN",
        link: "/shop",
        Image: womenImage,
    },
    {
        id:2,
        name:"MEN",
        link: "/shop",
        Image: menImage,
    },
    {
        id:3,
        name:"KIDS",
        link: "/shop",
        Image: kidsImage,
    },
    {
        id:4,
        name:"E-GIFT",
        link: "/shop",
        Image: CardsImage,
        description: "Surprise someone with the gift they really want.",
        btn: "DISCOVER MORE"
    },
]