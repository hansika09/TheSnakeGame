//Copyright belongs to Hansika Asthana

package hansika.snakegame;

import java.awt.*; //for classes- Color,dimension,font,fontmetrics,graphics,image,toolkit
import java.awt.event.*; //for classes- actionevent,actionlistener,keyadapter,keyevent
import javax.swing.*; //for classes- imageicon,jpanel,timer

public class Board extends JPanel implements ActionListener 
{
    private final int B_WIDTH = 500; //board's width
    private final int B_HEIGHT = 400; // board's height
    private final int DOT_SIZE = 10; //size of snake's dots and apples
    private final int ALL_DOTS = 900; //max possible dots
    private final int RAND_POS = 40; //random pos of apple
    private final int DELAY = 140; //speed of snake

    private final int x[] = new int[ALL_DOTS]; //x and y coordinates of snake
    private final int y[] = new int[ALL_DOTS];

    private int dots;
    private int apple_x;
    private int apple_y;

    private boolean leftDirection = false;
    private boolean rightDirection = true;
    private boolean upDirection = false;
    private boolean downDirection = false;
    private boolean inGame = true;

    private Timer timer;
    private Image ball;
    private Image apple;
    private Image head;

    public Board() //constructor 
    {    
        initBoard();
    }
    private void loadImages() //to import the images
    {
        ImageIcon iid = new ImageIcon("src/images/dot.png");
        ball = iid.getImage();
        
        ImageIcon iia = new ImageIcon("src/images/apple.png");
        apple = iia.getImage();

        ImageIcon iih = new ImageIcon("src/images/head.png");
        head = iih.getImage();
    }
    private void initBoard() //styling of the board
    {	
        addKeyListener(new TAdapter());
        //Color c1=new Color(156,203,156);
        //setBackground(c1);
        setBackground(Color.darkGray);
        setFocusable(true);
        setPreferredSize(new Dimension(B_WIDTH, B_HEIGHT));
        loadImages();
        initGame();
    }
    private void locateApple() //randomly locate apple
    {
        int r = (int) (Math.random() * RAND_POS);
        apple_x = ((r * DOT_SIZE));

        r = (int) (Math.random() * RAND_POS);
        apple_y = ((r * DOT_SIZE));
    }
    private void initGame() //create snake, apple, timer
    {
        dots = 3;
        for (int z = 0; z < dots; z++) //create a snake
        {
            x[z] = 50 - z * 10;
            y[z] = 50;
        }        
        locateApple(); //calling to locate apple on board
        
        timer = new Timer(DELAY, this); //begin the timer
        timer.start();
    }
    @Override
    public void paintComponent(Graphics g) 
    {
        super.paintComponent(g);
        doDrawing(g);
    }
    private void doDrawing(Graphics g) 
    {    
        if (inGame) 
        {
            g.drawImage(apple, apple_x, apple_y, this);
            for (int z = 0; z < dots; z++) 
            {
                if (z == 0) 
                {
                    g.drawImage(head, x[z], y[z], this);
                } 
                else 
                {
                    g.drawImage(ball, x[z], y[z], this);
                }
            }
            Toolkit.getDefaultToolkit().sync();
        } 
        else 
        {
            gameOver(g);
        }        
    }
    private void gameOver(Graphics g) //when the snake collides with walls or with its own body, game ends 
    {        
    	Toolkit.getDefaultToolkit().beep(); //beeps at the end
        String msg = "Game Over";
        Font small = new Font("Consolas", Font.BOLD, 50);
        FontMetrics metr = getFontMetrics(small);
        
        g.setColor(Color.red);
        g.setFont(small);
        g.drawString(msg, (B_WIDTH - metr.stringWidth(msg)) / 2, B_HEIGHT / 2);
    }
    private void checkApple() //when snake eats apple
    {
        if ((x[0] == apple_x) && (y[0] == apple_y)) //condition to check if the snake collides with apple
        {         	
        	Toolkit.getDefaultToolkit().beep(); //gives a beep everytime snake eats an apple
            dots++;
            locateApple();
        }
    }
  /*move() is key algo of this game.. we can move head of snake to any direction with help of keyboard
    when snake eats an apple, the first joint (head) moves one pos up of chain, 2nd on 1st pos of chain, 3rd on 2nd pos and so on*/
    private void move()
    { 
        for (int z = dots; z > 0; z--) //moves joint pos up in the chain
        {
            x[z] = x[(z - 1)];
            y[z] = y[(z - 1)];
        }
        if (leftDirection)  //moves head in left
        {
            x[0] -= DOT_SIZE;
        }
        if (rightDirection)  //moves head in right
        {
            x[0] += DOT_SIZE;
        }
        if (upDirection)  //  //moves head up
        {
            y[0] -= DOT_SIZE;
        }
        if (downDirection)    //moves head down
        {
            y[0] += DOT_SIZE;
        }
    }
    private void checkCollision()  //this works at time of game over to check if snake hit its own body or the walls
    {
        for (int z = dots; z > 0; z--)  //if snake hits its own joints
        {
            if ((z > 4) && (x[0] == x[z]) && (y[0] == y[z]))
            {
                inGame = false;
            }
        }
        if (y[0] >= B_HEIGHT)  //if snake hits bottom of board
        {
            inGame = false;
        }
        if (y[0] < 0) 
        {
            inGame = false;
        }
        if (x[0] >= B_WIDTH) 
        {
            inGame = false;
        }
        if (x[0] < 0) 
        {
            inGame = false;
        }
        if (!inGame)  //if none happens timer stops
        {
            timer.stop();
        }
    }
    @Override
    public void actionPerformed(ActionEvent e) 
    {
        if (inGame) 
        {
            checkApple();
            checkCollision();
            move();
        }
        repaint();
    }
    private class TAdapter extends KeyAdapter 
    {
        @Override
        public void keyPressed(KeyEvent e) 
        {
            int key = e.getKeyCode();
            if ((key == KeyEvent.VK_LEFT) && (!rightDirection)) 
            {
                leftDirection = true;
                upDirection = false;
                downDirection = false;
            }
            if ((key == KeyEvent.VK_RIGHT) && (!leftDirection)) 
            {
                rightDirection = true;
                upDirection = false;
                downDirection = false;
            }
            if ((key == KeyEvent.VK_UP) && (!downDirection)) 
            {
                upDirection = true;
                rightDirection = false;
                leftDirection = false;
            }
            if ((key == KeyEvent.VK_DOWN) && (!upDirection)) 
            {
                downDirection = true;
                rightDirection = false;
                leftDirection = false;
            }
        }
    }
}