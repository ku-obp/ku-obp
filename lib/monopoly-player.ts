import { PlayerProprety } from "@/lib/monopoly-types";

export class Player {
    public id: string;
    public username: string;
    public ord: number;
    
    public position: number;
    public balance: number;
    public properties: Array<PlayerProprety>;
    public isInJail: boolean;
    public jailTurnsRemaining: number;
    public getoutCards: number;
    public ready: boolean;
    public positions: { x: number; y: number };
    constructor(_id: string, _name: string) {
        this.id = _id;
        this.username = _name;
        this.ord = -1;
        this.position = 0;
        this.balance = 1500;
        this.properties = [];
        this.isInJail = false;
        this.jailTurnsRemaining = 0;
        this.getoutCards = 0;
        this.ready = false;
        this.positions = { x: 0, y: 0 };
    }
    recieveJson(json: PlayerJSON) {
        this.username = json.username;
        this.position = json.position;
        this.ord = json.ord;
        this.balance = json.balance;
        this.properties = json.properties;
        this.isInJail = json.isInJail;
        this.jailTurnsRemaining = json.jailTurnsRemaining;
        this.getoutCards = json.getoutCards;
        return this;
    }

    public toJson() {
        return {
            balance: this.balance,
            ord: this.ord,
            id: this.id,
            isInJail: this.isInJail,
            jailTurnsRemaining: this.jailTurnsRemaining,
            position: this.position,
            properties: this.properties,
            username: this.username,
            getoutCards: this.getoutCards,
        } as PlayerJSON;
    }

    get color() {
        if(this.ord in [0,1,2,3,4,5]) {
            return COLORMAP[this.ord];
        }
        else {
            return "";
        }
      }
}

export const COLORMAP = [
    "#E0115F",
    "#4169e1",
    "#50C878",
    "#FFC000",
    "#FF7F50",
    "#6C22C9"
  ]

export type PlayerJSON = {
    id: string;
    username: string;
    ord: number;
    position: number;
    balance: number;
    properties: Array<any>;
    isInJail: boolean;
    jailTurnsRemaining: number;
    getoutCards: number;
};
