export type Groups = {
  tribeName: string;
  numberOfMembers: number;
  totalPoints: number;
  dateGroupStarted: Date;
};


const groups: Groups [] = [

{
 tribeName: "Yuma",
 numberOfMembers: 10,
 totalPoints: 90,
 dateGroupStarted: new Date("02/02/2024"),

},


{
  tribeName: "Waheki",
  numberOfMembers: 15 ,
  totalPoints: 70 ,
  dateGroupStarted: new Date("10/02/2024"),

},
{
  tribeName: "Delta",
  numberOfMembers: 13,
  totalPoints: 100 ,
  dateGroupStarted: new Date("11/01/2024"),
},
{
  tribeName: "Fiji",
  numberOfMembers: 12 ,
  totalPoints: 50 ,
  dateGroupStarted: new Date ("29/03/2024"),
},

]


export default groups
