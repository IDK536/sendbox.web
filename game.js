function craft(body, widthObj, heightObj, labl, mas, color, lineWidth, opacity, quantity){
        for (let i = 0; i < quantity; i++) {
            const obj = Bodies.rectangle(body.position.x, body.position.y, widthObj, heightObj, {
                label: labl,
                restitution: 0.3,
                mass: mas,
                render: {
                    fillStyle: color,
                    strokeStyle: '#1F2937',
                    lineWidth: lineWidth
                }
            });
            World.add(world, obj);
        }
        Matter.World.remove(world, body);
}

function combination(obj1, obj2, labl, mas){
    const obj = Constraint.create({
        label: labl,
        mass: mas,
        bodyA: obj1,
        bodyB: obj2,
        pointA: { x: 0, y: 0 },
        pointB: { x: 90, y: 45 },
        stiffness: 1, // жёсткость: 1 = полностью жёсткое
        length: 0,
        // angularStiffness: 1 // фиксируем угол
    });
    World.add(world, obj);

} 

// Переключатель
switch_ = document.querySelector('input');
switch_.addEventListener('change',function() {
    if (switch_.checked) {
    render.canvas.style.backgroundColor = '#444D5B';
    } else {
    render.canvas.style.backgroundColor = '#DBDBDB';
    }
});





// Переменные
const { Engine, Render, Runner, World, Bodies, Query, Constraint } = Matter;



const engine = Engine.create();
const world = engine.world;
const canvas = document.querySelector('.select_main')
width = canvas.clientWidth
height = canvas.clientHeight
materials = []



// Рендерер
const render = Render.create({
element: canvas,
engine: engine,
options: {
    width: width,
    height: height,
    wireframes: false,
    background: '#DBDBDB'
}
});


// Мышь

const mouse = Matter.Mouse.create(render.canvas);

const mouseConstraint = Matter.MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    stiffness: 0.2,
    render: {
      visible: false
    }
  }
});

World.add(world, mouseConstraint);
render.mouse = mouse;

// Объекты и их создание
const ground = Bodies.rectangle(width/2, height - 40, width, 60, {
    label: 'ground',
    isStatic: true,
    render: {
        fillStyle: '#008013'
    }
});

// Обработка столкновений

Matter.Events.on(engine, 'collisionStart', function(event) {
  const pairs = event.pairs;

  // Перебираем все пары, которые только что столкнулись
  pairs.forEach(pair => {
    const bodyA = pair.bodyA;
    const bodyB = pair.bodyB;

    // удаление старого и добавление нового объектов (дерево -> доски)
    if (bodyA.label === 'woad' && bodyB.label === 'stone' && Math.abs(bodyB.speed) > 5) {
        craft(bodyA, 90, 90, 'board', 3, '#966F33', 3, 0, 2);
    } else if (bodyA.label === 'stone' && bodyB.label === 'woad' && Math.abs(bodyA.speed) > 5) {
        craft(bodyB, 90, 90, 'board', 3, '#966F33', 3, 0, 2);
    }

    if (bodyA.label === 'board' && bodyB.label === 'stone' && Math.abs(bodyB.speed) > 5) {
        craft(bodyA, 30, 90, 'stick', 1, '#966F33', 3, 0, 3);
    } else if (bodyA.label === 'stone' && bodyB.label === 'board' && Math.abs(bodyA.speed) > 5) {
        craft(bodyB, 30, 90, 'stick', 1, '#966F33', 3, 0, 3);
    }

    if (bodyA.label === 'stone' && bodyB.label === 'stone' && (Math.abs(bodyA.speed) > 5 || Math.abs(bodyB.speed) > 5)) {
        console.log('stone');
        craft(bodyB, 90, 90, 'bake', 20, '#954535', 10, 0, 1);
        Matter.World.remove(world, bodyA);
    } 
    

    if (bodyA.label === 'bake' && bodyB.label === 'send' && Math.abs(bodyB.speed) > 5) {
        craft(bodyB, 90, 90, 'glass', 5, '#88C6ED', 3, 0.9, 1);
    } else if (bodyA.label === 'send' && bodyB.label === 'bake' && Math.abs(bodyA.speed) > 5) {
        craft(bodyA, 90, 90, 'glass', 5, '#88C6ED', 3, 0.9, 1);
    }

    if (bodyA.label === 'glass' && Math.abs(bodyA.speed) > 30) {
        craft(bodyA, 30, 30, 'glass_small', 1.5, '#88C6ED', 3, 0.9, 9);
    } else if (bodyB.label === 'glass' && Math.abs(bodyB.speed) > 30) {
        craft(bodyB, 30, 30, 'glass_small', 1.5, '#88C6ED', 3, 0.9, 9);
    }




    // if (bodyA.label === 'stone' && bodyB.label === 'stick' && Math.abs(bodyB.speed) > 5) {
    //     combination(bodyA, bodyB, 'tree', 11);
    // }


  });
});


// Создание

    // Создаем границы
    const wallThickness = 50;

    const walls = [
    // Верхняя стенка
    Bodies.rectangle(width / 2, -wallThickness / 2, width, wallThickness, { isStatic: true }),
    // Нижняя стенка
    Bodies.rectangle(width / 2, height + wallThickness / 2, width, wallThickness, { isStatic: true }),
    // Левая стенка
    Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height, { isStatic: true }),
    // Правая стенка
    Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height, { isStatic: true })
    ];

    World.add(world, walls);

// Создание объектов


        //     const send = Bodies.rectangle(200, 100, size, size, {
        //         label: 'send',
        //         restitution: 0.3,
        //         mass: 5,
        //         render: {
        //             fillStyle: '#954535',
        //             strokeStyle: '#1F2937',
        //             lineWidth: 10
        //         }
        //     });
        //     World.add(world, send);
        // };


function create(material) {
    if (material == "woad"){
        const woad = Bodies.rectangle(200, 100, 90, 90, {
            label: 'woad',
            restitution: 0.3,
            mass: 5,
            render: {
                fillStyle: '#8B4513',
                strokeStyle: '#1F2937',
                lineWidth: 3
            }
        });

        World.add(world, woad);
    } else if (material == "stone") {
        const stone = Bodies.rectangle(200, 100, 90, 90, {
            label: 'stone',
            restitution: 0.3,
            mass: 10,
            render: {
                fillStyle: '#C2C2C2',
                strokeStyle: '#1F2937',
                lineWidth: 3
            }
        });
        World.add(world, stone);
    } else if (material == "send") {
        const size = 90; // Размер объекта
        
        const send = Bodies.rectangle(200, 100, size, size, {
            label: 'send',
            restitution: 0.3,
            mass: 5,
            render: {
                fillStyle: '#fcdd76',
                strokeStyle: '#1F2937',
                lineWidth: 3
            }
        });
        World.add(world, send);
    }
}

// Удаление объекта с помощью ПКМ
render.canvas.addEventListener('contextmenu', function(e) {
    e.preventDefault(); // отключаем стандартное контекстное меню

    // Получаем позицию клика относительно canvas
    const mousePos = {
        x: (e.offsetX || e.clientX - render.canvas.offsetLeft),
        y: (e.offsetY || e.clientY - render.canvas.offsetTop)
    };

    const allBodies = Matter.Composite.allBodies(engine.world);
    const clickedBodies = Matter.Query.point(allBodies, mousePos);

    if (clickedBodies.length > 0) {
        Matter.World.remove(world, clickedBodies[0]);
    } 
});




World.add(world, ground);

Render.run(render);
Runner.run(Runner.create(), engine);