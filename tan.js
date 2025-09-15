import curses
from random import randint

# 初始化屏幕
screen = curses.initscr()
curses.curs_set(0)
sh, sw = screen.getmaxyx()  # 获取窗口的高度和宽度
w = curses.newwin(sh, sw, 0, 0)  # 创建一个窗口
w.keypad(1)
w.timeout(100)  # 每100毫秒刷新一次

# 初始化蛇和食物
snk_x = sw // 4
snk_y = sh // 2
snake = [
    [snk_y, snk_x],
    [snk_y, snk_x - 1],
    [snk_y, snk_x - 2]
]
food = [sh // 2, sw // 2]
w.addch(food[0], food[1], curses.ACS_PI)

# 初始化方向
key = curses.KEY_RIGHT

# 游戏循环
while True:
    next_key = w.getch()
    key = key if next_key == -1 else next_key

    # 检查游戏结束条件
    if snake[0][0] in [0, sh] or snake[0][1] in [0, sw] or snake[0] in snake[1:]:
        curses.endwin()
        quit()

    # 更新蛇的位置
    new_head = [snake[0][0], snake[0][1]]

    if key == curses.KEY_DOWN:
        new_head[0] += 1
    if key == curses.KEY_UP:
        new_head[0] -= 1
    if key == curses.KEY_LEFT:
        new_head[1] -= 1
    if key == curses.KEY_RIGHT:
        new_head[1] += 1

    snake.insert(0, new_head)

    # 检查是否吃到食物
    if snake[0] == food:
        food = None
        while food is None:
            nf = [
                randint(1, sh - 1),
                randint(1, sw - 1)
            ]
            food = nf if nf not in snake else None
        w.addch(food[0], food[1], curses.ACS_PI)
    else:
        tail = snake.pop()
        w.addch(tail[0], tail[1], ' ')

    w.addch(snake[0][0], snake[0][1], curses.ACS_CKBOARD)