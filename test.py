pg = [100, 10, 20 , 30, 50] # 특정 포인트
p_rank = [1, 1, 1, 1, 1] # 플레이어별 순위

p_p = [0,0,0,0,0] # 플레이어별 포인트

def gp(p): # 포인트를 주는 함수
    return p


for i in range(5):
    p_rank[i] = 1 # 순위 초기화
    for j in range(5):
        if pg[i] < pg[j] : # 순위 계산
            p_rank[i] = p_rank[i] + 1

for i in range(5): 
    print("점수 : " , pg[i] , " 순위 : " , p_rank[i]) 
    if p_rank[i] == 1:
        p_p[i] += gp(10)
    elif p_rank[i] == 2:
        p_p[i] += gp(7)
    elif p_rank[i] == 3:
        p_p[i] += gp(5)
    elif p_rank[i] == 4:
        p_p[i] += gp(3)
    elif p_rank[i] == 5:
        p_p[i] += gp(1)

print(p_p)




