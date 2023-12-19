export type ChanceCardMetadata = {
    title: string,
    simple: string,
    detail: string,
    note: string | null
}

export const PREDEFINED_CHANCE_IDS: Set<string> = new Set<string>([
    "newborn",
    "earthquake",
    "tax-heaven",
    "disease",
    "emergency-aid",
    "drug",
    "nursing", 
    "quirk-of-fate",
    "inherit-get",
    "inherit-donate",
    "maintenance",
    "healthy",
    "cyber-security-threat",
    "Typhoon",
    "pandemic",
    "fake-news",
    "green-new-deal",
    "voice-phishing",
    "scholarship",
    "catastrophe",
    "fee-exemption",
    "bonus",
    "doubleLotto",
    "insider-trading",
    "traffic-jam",
    "quick-move",
    "traffic-accident",
    "tax-exemption",
    "too-much-electrivity",
    "lawyers-help",
    "soaring-stock-price",
    "plunge-in-stock-price",
    "studying-hard",
    "extinction",
    "trade"
])

const PREDEFINED_CHANCE_CARDS: {
    [chanceId: string]: ChanceCardMetadata
} = {
    "newborn": {
        title: "출산을 축하합니다",
        simple: "축하합니다.",
        detail: "시장으로부터 출산 축하금 100만을 받습니다.",
        note: null
    },
    "earthquake": {
        title: "지진",
        simple: "지진이 발생했습니다.",
        detail: "자신의 집이 있는 모든 도시에 집 한채씩 파괴됩니다.",
        note: null
    },
    "tax-heaven": {
        title: "조세 회피처",
        simple: "어두운 금융 거래가 드러났습니다.",
        detail: "즉시 감옥으로 갑니다.",
        note: "출발점을 지나지 않습니다.(바퀴 수는 그대로)"
    },
    "disease": {
        title: "병원행",
        simple: "건강에\n이상 신호가 생겼습니다.",
        detail: "치료를 위해 병원을 방문하십시오.",
        note: "출발점을 지나지 않습니다.(바퀴 수는 그대로)"
    },
    "emergency-aid": {
        title: "긴급의료비 지원",
        simple: "긴급의료비가 지급되었습니다.",
        detail: "병원 방문 시 1회 무료로 치료받습니다.",
        note: "이 카드는 양도하거나 매매할 수 없습니다."
    },
    "drug": {
        title: "마약 소지",
        simple: "불법 물질을\n소유한 것으로 밝혀졌습니다.",
        detail: "즉시 감옥으로 이동합니다.",
        note: "출발점을 지나지 않습니다.(바퀴 수는 그대로)"
    },
    "nursing": {
        title: "부모님 간호",
        simple: "부모님께서\n병원에 입원하셨습니다.",
        detail: "병원으로 이동합니다.",
        note: "출발점을 지나지 않습니다.(바퀴 수는 그대로)"
    }, 
    "quirk-of-fate": {
        title: "왕자와 거지",
        simple: "운명의 장난!\n주사위를 굴리십시오.",
        detail: "나온 숫자만큼 시계 방향에 있는 참가자와\n모든 것을 교환합니다.",
        note: "자신이 나오면 다시 주사위를 굴립니다."
    },
    "inherit-get": {
        title: "유산 상속",
        simple: "유산을 상속받았습니다.",
        detail: "시장에서 100만을 지급받습니다.",
        note: null
    },
    "inherit-donate": {
        title: "유산 기부",
        simple: "상속받은 유산 중 일부를 기부하기로 했습니다.",
        detail: "어려운 이웃을 위해 100만을 후원합니다.\n(시장에 지불)",
        note: null
    },
    "maintenance": {
        title: "집 유지보수",
        simple: "집주인은 자신의 재산을\n관리할 책임이 있습니다.",
        detail: "집 한 채당 관리비 10만을 시장에 지불하십시오.",
        note: "예) 소유한 집이 5채일 경우, 50만을 지불합니다."
    },
    "healthy": {
        title: "건강한 식습관",
        simple: "채식 중심의 건강한 식단으로\n건강을 유지하고 있습니다.",
        detail: "병원비 1회 무료입니다.",
        note: "이 카드는 양도하거나 매매할 수 없습니다."
    },
    "cyber-security-threat": {
        title: "사이버 범죄",
        simple: "사이버 범죄가 증가하고 있습니다.\n온라인 계정이 도용되었습니다",
        detail: "시장에 100만을 지불해 문제를 해결합니다.",
        note: null
    },
    "Typhoon": {
        title: "태풍",
        simple: "기후 위기로 인해\n태풍이 발생했습니다.",
        detail: "해안 도시에 있는 건물이 한 채씩 파괴됩니다.",
        note: "해안 도시 : 목포, 강릉, 포항, 순천, 제주 , 울산, 인천, 부산, 창원, 서산, 순천, 여수"
    },
    "pandemic": {
        title: "팬데믹",
        simple: "바이러스로 인해\n경기가 침체되고 있습니다.",
        detail: "1턴 동안 모든 사용료\n(토지, 집, 서비스)가 면제됩니다.",
        note: null
    },
    "fake-news": {
        title: "이미지 메이킹",
        simple: "당신에 관한 가짜뉴스가\n만들어지고 있습니다.\n명성을 회복하십시오!",
        detail: "변호사 및 홍보 담당자에게\n총 100만을 지불하십시오. (시장에 지불)",
        note: null
    },
    "green-new-deal": {
        title: "그린뉴딜",
        simple: "친환경 에너지 사용으로 거주환경이 개선,\n사람들이 몰리고 있습니다.",
        detail: "자신의 집이 지어진 도시 한 곳에\n무료로 집을 1채 더 짓습니다.",
        note: null
    },
    "voice-phishing": {
        title: "보이스피싱",
        simple: "보이스피싱\n사기 피해를 당했습니다.",
        detail: "100만을 시장에 지불합니다.",
        note: null
    },
    "scholarship": {
        title: "장학금",
        simple: "장학금이 지급되었습니다.",
        detail: "대학으로 이동합니다.\n(1회 방문 : 입학 / 2회 방문 : 졸업)",
        note: "출발점을 지나지 않습니다.(바퀴 수는 그대로)"
    },
    "catastrophe": {
        title: "긴급재난 발생",
        simple: "대도시들에 긴급재난이 발생했습니다.",
        detail: "1턴동안 대도시들의 모든 사용료가 면제됩니다.",
        note: "대도시 : 서울, 부산, 인천, 대구, 대전, 광주, 울산, 창원, 고양, 수원"
    },
    "fee-exemption": {
        title: "사용료 면제",
        simple: "토지 및 건물 사용료를 1회 면제받습니다.",
        detail: "사용료를 100% 면제받습니다.",
        note: "이 카드는 양도하거나 매매할 수 없습니다."
    },
    "bonus": {
        title: "보너스 지급",
        simple: "회사가 증권시장에 상장되었습니다.",
        detail: "다음 차례 출발지를 지날 때\n2배의 급여를 받습니다",
        note: "이 카드느 양도 및 매매가 불가능하며, 출발지를 지날 때에 자동으로 사용됩니다."
    },
    "doubleLotto": {
        title: "더블 로또",
        simple: "더블 로또 티켓이 발급되었습니다",
        detail: "로또 상금이 2배가 됩니다.",
        note: "이 카드느 양도, 매매, 중복 사용이 불가능하며, 로또 도전 시 사용할 수 있습니다."
    },
    "insider-trading": {
        title: "내부자 거래",
        simple: "특권금융정보를\n공유한 것이 드러났습니다",
        detail: "즉시 감옥으로 이동합니다.",
        note: "출발점을 지나지 않습니다.(바퀴 수는 그대로)"
    },
    "traffic-jam": {
        title: "교통체증",
        simple: "도시의 교통체증이 심각하여\n거주환경이 나빠지고 있습니다.",
        detail: "원하는 도시의 집 한 채를 제거합니다.",
        note: null
    },
    "quick-move": {
        title: "어디든 이동할 기회를 얻었습니다.",
        simple: "원하는 곳으로 이동합니다.\n",
        detail: "출발점을 지날 경우 임금을 받습니다.",
        note: null
    },
    "traffic-accident": {
        title: "교통사고",
        simple: "교통사고가 발생했습니다.",
        detail: "수리비 50만을 시장에 지불합니다.",
        note: null
    },
    "tax-exemption": {
        title: "공과금 면제",
        simple: "공과금을 면제받습니다.",
        detail: "출발점 지날 때에 물,전기 및 도시가스 사용료\w전액을 1회 면제받습니다.",
        note: "이 카드느 양도 및 매매가 불가능하며, 출발지를 지날 때에 자동으로 사용됩니다."
    },
    "too-much-electrivity": {
        title: "전기요금",
        simple: "전기를 너무 많이 사용했습니다.",
        detail: "전력 회사로 이동해 사용료를 지불합니다.",
        note: "출발점을 지나지 않습니다.(바퀴 수는 그대로)"
    },
    "lawyers-help": {
        title: "인권변호사",
        simple: "인권변호사의\n변호를 받습니다.",
        detail: "즉시 감옥에서 석방됩니다.",
        note: "이 카드는 양도하거나 매매할 수 없습니다."
    },
    "soaring-stock-price": {
        title: "주가 폭등",
        simple: "보유한 주식의 움직임이 심상찮습니다.",
        detail: "보유한 현금의 50%를 시장에서 받습니다.\n(현금 끝자리 5만일 경우 반올림)",
        note: null
    },
    "plunge-in-stock-price": {
        title: "주가 폭락",
        simple: "보유한 주식의 움직임이 심상찮습니다.",
        detail: "보유한 현금의 50%를 잃습니다.\n(시장에 지불. 현금 끝자리 5만일 경우 반올림)",
        note: null
    },
    "studying-hard": {
        title: "주경야독",
        simple: "밤잠을 쪼개가며 열심히 일하고 공부해\n학위 취득에 성공했습니다.",
        detail: "즉시 졸업 증서를 받습니다.",
        note: null
    },
    "extinction": {
        title: "지방소멸",
        simple: "저출산으로 인해\n인구가 급격히 감소하고 있습니다.",
        detail: "도시 그룹을 하나 골라, 해당 그룹의 모든 도시에 있는 집을 1채 씩 없앱니다",
        note: null
    },
    "trade": {
        title: "도시교환",
        simple: "도시를 교환할 기회가 생겼습니다.",
        detail: "자신의 도시 1개와 (상대방이 소유한) 도시 1개를 선택하여,\n도시증서와 건물 소유권을 맞교환합니다.",
        note: null
    },
}

export default PREDEFINED_CHANCE_CARDS