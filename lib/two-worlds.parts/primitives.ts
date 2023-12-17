export class PropertiesRegistry {
    private inner: Map<number, {ownerEmail: string; count: number}>
    public constructor() {
        this.inner = new Map<number, {ownerEmail: string; count: number}>()
    }
    public search(cellId: number): {ownerEmail: string | null, count: number} {
        const search_for = this.inner.get(cellId)
        if(search_for === undefined) {
            return {
                ownerEmail: null,
                count: 0
            }
        } else {
            return search_for
        }
    }
    public construct(cellId: number, count_to_construct: number = 1, playerEmail?: string) {
        const {ownerEmail, count} = this.search(cellId)
        if(count_to_construct === 0) {
            return;
        }
        if(ownerEmail === null) {
            if(playerEmail === undefined) {
                return;
            } else {
                count_to_construct = Math.floor(count_to_construct)
                if(count_to_construct < 1) {
                    return;
                } else {
                    this.inner.set(cellId, {ownerEmail: playerEmail, count: Math.min(3, count_to_construct)})
                }
            }
        } else {
            if(playerEmail === undefined) {
                const new_count = Math.min(3,count + Math.floor(count_to_construct))
                if (new_count <= 0) {
                    this.inner.delete(cellId)
                } else {
                    this.inner.set(cellId, {ownerEmail, count: new_count})
                }
                
            }
        }
    }
    public static copy(orig: PropertiesRegistry) {
        const copied = new PropertiesRegistry()
        orig.inner.forEach((value, key) => copied.inner.set(key, value))
        return copied
    }
    
    public static from(data: {ownerEmail: string, count: number, cellId: number}[]) {
        const result = new PropertiesRegistry()
        for(const {ownerEmail, count, cellId} of data) {
            result.construct(cellId, count, ownerEmail)
        }
        return result
    }
}



export type DiceValueType = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type DiceCacheType =
	| 0
	| 1
	| 2
	| 3
	| 4
	| 5
	| 6
	| 7
	| 8
	| 9
	| 10
	| 11
	| 12
	| 13
	| 14
	| 15
	| 16
	| 17
	| 18
	| 19
	| 20
	| 21
	| 22
	| 23
	| 24
	| 25
	| 26
	| 27
	| 28
	| 29
	| 30
	| 31
	| 32
	| 33
	| 34
	| 35
	| 36;

export type DicePairType = {
	diceLeft: DiceValueType;
	diceRight: DiceValueType;
};


export function DiceCacheToValuesPairLookup(
	cache: DiceCacheType
): DicePairType {
	switch (cache) {
		case 1:
			return { diceLeft: 1, diceRight: 1 };
		case 2:
			return { diceLeft: 1, diceRight: 2 };
		case 3:
			return { diceLeft: 1, diceRight: 3 };
		case 4:
			return { diceLeft: 1, diceRight: 4 };
		case 5:
			return { diceLeft: 1, diceRight: 5 };
		case 6:
			return { diceLeft: 1, diceRight: 6 };
		case 7:
			return { diceLeft: 2, diceRight: 1 };
		case 8:
			return { diceLeft: 2, diceRight: 2 };
		case 9:
			return { diceLeft: 2, diceRight: 3 };
		case 10:
			return { diceLeft: 2, diceRight: 4 };
		case 11:
			return { diceLeft: 2, diceRight: 5 };
		case 12:
			return { diceLeft: 2, diceRight: 6 };
		case 13:
			return { diceLeft: 3, diceRight: 1 };
		case 14:
			return { diceLeft: 3, diceRight: 2 };
		case 15:
			return { diceLeft: 3, diceRight: 3 };
		case 16:
			return { diceLeft: 3, diceRight: 4 };
		case 17:
			return { diceLeft: 3, diceRight: 5 };
		case 18:
			return { diceLeft: 3, diceRight: 6 };
		case 19:
			return { diceLeft: 4, diceRight: 1 };
		case 20:
			return { diceLeft: 4, diceRight: 2 };
		case 21:
			return { diceLeft: 4, diceRight: 3 };
		case 22:
			return { diceLeft: 4, diceRight: 4 };
		case 23:
			return { diceLeft: 4, diceRight: 5 };
		case 24:
			return { diceLeft: 4, diceRight: 6 };
		case 25:
			return { diceLeft: 5, diceRight: 1 };
		case 26:
			return { diceLeft: 5, diceRight: 2 };
		case 27:
			return { diceLeft: 5, diceRight: 3 };
		case 28:
			return { diceLeft: 5, diceRight: 4 };
		case 29:
			return { diceLeft: 5, diceRight: 5 };
		case 30:
			return { diceLeft: 5, diceRight: 6 };
		case 31:
			return { diceLeft: 6, diceRight: 1 };
		case 32:
			return { diceLeft: 6, diceRight: 2 };
		case 33:
			return { diceLeft: 6, diceRight: 3 };
		case 34:
			return { diceLeft: 6, diceRight: 4 };
		case 35:
			return { diceLeft: 6, diceRight: 5 };
		case 36:
			return { diceLeft: 6, diceRight: 6 };
        default:
			return { diceLeft: 0, diceRight: 0 };
	}
}

function convertDiceValuesPairToCache(
	diceLeft: DiceValueType,
	diceRight: DiceValueType
): number {
	if (diceLeft === 0 || diceRight === 0) {
		return 0;
	} else {
		return (diceLeft - 1) * 6 + diceRight;
	}
}