import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

// ============================================================
// Texture Generator — procedural canvas textures
// ============================================================
class TextureGen {
    static create(width, height, drawFn) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        drawFn(ctx, width, height);
        const tex = new THREE.CanvasTexture(canvas);
        tex.magFilter = THREE.NearestFilter;
        tex.minFilter = THREE.NearestFilter;
        return tex;
    }

    static grassTop() {
        return this.create(16, 16, (ctx, w, h) => {
            ctx.fillStyle = '#5a8c2a';
            ctx.fillRect(0, 0, w, h);
            for (let i = 0; i < 60; i++) {
                const x = Math.random() * w | 0;
                const y = Math.random() * h | 0;
                ctx.fillStyle = `hsl(${100 + Math.random() * 30}, ${50 + Math.random() * 30}%, ${30 + Math.random() * 20}%)`;
                ctx.fillRect(x, y, 1, 1);
            }
        });
    }

    static grassSide() {
        return this.create(16, 16, (ctx, w, h) => {
            ctx.fillStyle = '#5a8c2a';
            ctx.fillRect(0, 0, w, 3);
            for (let i = 0; i < 20; i++) {
                const x = Math.random() * w | 0;
                const y = Math.random() * 3 | 0;
                ctx.fillStyle = `hsl(${100 + Math.random() * 30}, 55%, ${32 + Math.random() * 15}%)`;
                ctx.fillRect(x, y, 1, 1);
            }
            ctx.fillStyle = '#8b6914';
            ctx.fillRect(0, 3, w, h - 3);
            for (let i = 0; i < 40; i++) {
                const x = Math.random() * w | 0;
                const y = 3 + Math.random() * (h - 3) | 0;
                ctx.fillStyle = `hsl(30, ${40 + Math.random() * 20}%, ${25 + Math.random() * 20}%)`;
                ctx.fillRect(x, y, 1, 1);
            }
        });
    }

    static dirt() {
        return this.create(16, 16, (ctx, w, h) => {
            ctx.fillStyle = '#8b6914';
            ctx.fillRect(0, 0, w, h);
            for (let i = 0; i < 60; i++) {
                const x = Math.random() * w | 0;
                const y = Math.random() * h | 0;
                ctx.fillStyle = `hsl(30, ${40 + Math.random() * 20}%, ${22 + Math.random() * 22}%)`;
                ctx.fillRect(x, y, 1, 1);
            }
        });
    }

    static stone() {
        return this.create(16, 16, (ctx, w, h) => {
            ctx.fillStyle = '#808080';
            ctx.fillRect(0, 0, w, h);
            for (let i = 0; i < 80; i++) {
                const x = Math.random() * w | 0;
                const y = Math.random() * h | 0;
                const l = 40 + Math.random() * 30;
                ctx.fillStyle = `hsl(0, 0%, ${l}%)`;
                ctx.fillRect(x, y, 1, 1);
            }
            ctx.strokeStyle = 'rgba(0,0,0,0.15)';
            ctx.lineWidth = 0.5;
            for (let i = 0; i < 3; i++) {
                ctx.beginPath();
                ctx.moveTo(Math.random() * w, Math.random() * h);
                ctx.lineTo(Math.random() * w, Math.random() * h);
                ctx.stroke();
            }
        });
    }

    static sand() {
        return this.create(16, 16, (ctx, w, h) => {
            ctx.fillStyle = '#d4b96a';
            ctx.fillRect(0, 0, w, h);
            for (let i = 0; i < 50; i++) {
                const x = Math.random() * w | 0;
                const y = Math.random() * h | 0;
                ctx.fillStyle = `hsl(42, ${50 + Math.random() * 20}%, ${60 + Math.random() * 20}%)`;
                ctx.fillRect(x, y, 1, 1);
            }
        });
    }

    static water() {
        return this.create(16, 16, (ctx, w, h) => {
            ctx.fillStyle = 'rgba(30, 100, 200, 0.7)';
            ctx.fillRect(0, 0, w, h);
            for (let i = 0; i < 30; i++) {
                const x = Math.random() * w | 0;
                const y = Math.random() * h | 0;
                ctx.fillStyle = `hsla(210, ${60 + Math.random() * 20}%, ${40 + Math.random() * 20}%, 0.5)`;
                ctx.fillRect(x, y, 2, 1);
            }
        });
    }

    static woodLogSide() {
        return this.create(16, 16, (ctx, w, h) => {
            ctx.fillStyle = '#6b4226';
            ctx.fillRect(0, 0, w, h);
            // Vertical bark lines
            for (let x = 0; x < w; x += 3) {
                ctx.fillStyle = `hsl(25, ${30 + Math.random() * 20}%, ${20 + Math.random() * 15}%)`;
                ctx.fillRect(x, 0, 1, h);
            }
            for (let i = 0; i < 40; i++) {
                const x = Math.random() * w | 0;
                const y = Math.random() * h | 0;
                ctx.fillStyle = `hsl(25, ${25 + Math.random() * 20}%, ${18 + Math.random() * 20}%)`;
                ctx.fillRect(x, y, 1, 2);
            }
        });
    }

    static woodLogTop() {
        return this.create(16, 16, (ctx, w, h) => {
            ctx.fillStyle = '#8b6914';
            ctx.fillRect(0, 0, w, h);
            // Concentric rings
            const cx = w / 2, cy = h / 2;
            for (let r = 6; r > 0; r -= 2) {
                ctx.strokeStyle = `hsl(30, ${35 + r * 5}%, ${25 + r * 3}%)`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(cx, cy, r, 0, Math.PI * 2);
                ctx.stroke();
            }
            // Center dot
            ctx.fillStyle = '#5a3a10';
            ctx.fillRect(7, 7, 2, 2);
        });
    }

    static woodPlank() {
        return this.create(16, 16, (ctx, w, h) => {
            ctx.fillStyle = '#b8934a';
            ctx.fillRect(0, 0, w, h);
            // Horizontal wood grain lines
            for (let y = 0; y < h; y += 4) {
                ctx.fillStyle = `hsl(35, ${40 + Math.random() * 15}%, ${55 + Math.random() * 15}%)`;
                ctx.fillRect(0, y, w, 1);
            }
            for (let i = 0; i < 30; i++) {
                const x = Math.random() * w | 0;
                const y = Math.random() * h | 0;
                ctx.fillStyle = `hsl(35, ${35 + Math.random() * 20}%, ${50 + Math.random() * 20}%)`;
                ctx.fillRect(x, y, 2, 1);
            }
        });
    }

    static cobblestone() {
        return this.create(16, 16, (ctx, w, h) => {
            ctx.fillStyle = '#777';
            ctx.fillRect(0, 0, w, h);
            // Irregular stone blocks
            const stones = [
                [0, 0, 5, 4], [5, 0, 6, 5], [11, 0, 5, 4],
                [0, 4, 4, 5], [4, 5, 5, 4], [9, 4, 7, 5],
                [0, 9, 6, 4], [6, 9, 5, 4], [11, 9, 5, 4],
                [0, 13, 5, 3], [5, 13, 6, 3], [11, 13, 5, 3]
            ];
            for (const [sx, sy, sw, sh] of stones) {
                const l = 45 + Math.random() * 25;
                ctx.fillStyle = `hsl(0, 0%, ${l}%)`;
                ctx.fillRect(sx, sy, sw, sh);
                ctx.strokeStyle = 'rgba(0,0,0,0.2)';
                ctx.lineWidth = 0.5;
                ctx.strokeRect(sx + 0.5, sy + 0.5, sw - 1, sh - 1);
            }
        });
    }

    static glass() {
        return this.create(16, 16, (ctx, w, h) => {
            ctx.fillStyle = 'rgba(200, 230, 255, 0.3)';
            ctx.fillRect(0, 0, w, h);
            // Border frame
            ctx.strokeStyle = 'rgba(180, 210, 240, 0.8)';
            ctx.lineWidth = 1;
            ctx.strokeRect(0.5, 0.5, w - 1, h - 1);
            // Light reflection
            ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
            ctx.fillRect(2, 2, 4, 4);
        });
    }

    static brick() {
        return this.create(16, 16, (ctx, w, h) => {
            // Mortar background
            ctx.fillStyle = '#a0a0a0';
            ctx.fillRect(0, 0, w, h);
            // Brick rows with offset
            const brickH = 4, brickW = 7, mortarW = 1;
            for (let row = 0; row < 4; row++) {
                const offsetX = (row % 2) * 4;
                const y = row * brickH;
                for (let col = -1; col < 3; col++) {
                    const x = col * (brickW + mortarW) + offsetX;
                    const r = 160 + Math.random() * 40;
                    const g = 70 + Math.random() * 30;
                    const b = 50 + Math.random() * 20;
                    ctx.fillStyle = `rgb(${r},${g},${b})`;
                    ctx.fillRect(Math.max(0, x), y, brickW, brickH - mortarW);
                }
            }
        });
    }

    static leaves() {
        return this.create(16, 16, (ctx, w, h) => {
            ctx.fillStyle = '#3a7a20';
            ctx.fillRect(0, 0, w, h);
            for (let i = 0; i < 80; i++) {
                const x = Math.random() * w | 0;
                const y = Math.random() * h | 0;
                const bright = Math.random() > 0.5;
                ctx.fillStyle = bright
                    ? `hsl(${105 + Math.random() * 25}, ${55 + Math.random() * 20}%, ${35 + Math.random() * 20}%)`
                    : `hsl(${100 + Math.random() * 20}, ${40 + Math.random() * 20}%, ${20 + Math.random() * 15}%)`;
                ctx.fillRect(x, y, 1, 1);
            }
        });
    }

    static craftingTableTop() {
        return this.create(16, 16, (ctx, w, h) => {
            ctx.fillStyle = '#8b6914';
            ctx.fillRect(0, 0, w, h);
            // Grid lines
            ctx.strokeStyle = 'rgba(0,0,0,0.4)';
            ctx.lineWidth = 0.5;
            for (let i = 0; i <= 4; i++) {
                const p = (i / 4) * w;
                ctx.beginPath(); ctx.moveTo(p, 0); ctx.lineTo(p, h); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(0, p); ctx.lineTo(w, p); ctx.stroke();
            }
            // Darker border
            ctx.strokeStyle = 'rgba(0,0,0,0.3)';
            ctx.lineWidth = 1;
            ctx.strokeRect(0.5, 0.5, w - 1, h - 1);
        });
    }

    static craftingTableSide() {
        return this.create(16, 16, (ctx, w, h) => {
            // Wood plank base
            ctx.fillStyle = '#b8934a';
            ctx.fillRect(0, 0, w, h);
            for (let y = 0; y < h; y += 4) {
                ctx.fillStyle = `hsl(35, ${40 + Math.random() * 15}%, ${50 + Math.random() * 10}%)`;
                ctx.fillRect(0, y, w, 1);
            }
            // Tool area in center
            ctx.fillStyle = 'rgba(60,40,20,0.3)';
            ctx.fillRect(4, 4, 8, 8);
            // Small saw/hammer icon hint
            ctx.fillStyle = '#555';
            ctx.fillRect(6, 5, 1, 6);
            ctx.fillRect(5, 5, 3, 2);
            ctx.fillRect(9, 7, 3, 1);
            ctx.fillRect(9, 6, 1, 3);
        });
    }
}

// ============================================================
// Simple Noise (value noise for terrain)
// ============================================================
class SimpleNoise {
    constructor(seed = 42) {
        this.perm = new Uint8Array(512);
        const p = new Uint8Array(256);
        for (let i = 0; i < 256; i++) p[i] = i;
        let s = seed;
        for (let i = 255; i > 0; i--) {
            s = (s * 16807 + 0) % 2147483647;
            const j = s % (i + 1);
            [p[i], p[j]] = [p[j], p[i]];
        }
        for (let i = 0; i < 512; i++) this.perm[i] = p[i & 255];
    }

    fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
    lerp(a, b, t) { return a + t * (b - a); }

    grad(hash, x, y) {
        const h = hash & 3;
        const u = h < 2 ? x : -x;
        const v = h === 0 || h === 3 ? y : -y;
        return u + v;
    }

    noise2D(x, y) {
        const xi = Math.floor(x) & 255;
        const yi = Math.floor(y) & 255;
        const xf = x - Math.floor(x);
        const yf = y - Math.floor(y);

        const u = this.fade(xf);
        const v = this.fade(yf);

        const aa = this.perm[this.perm[xi] + yi];
        const ab = this.perm[this.perm[xi] + yi + 1];
        const ba = this.perm[this.perm[xi + 1] + yi];
        const bb = this.perm[this.perm[xi + 1] + yi + 1];

        return this.lerp(
            this.lerp(this.grad(aa, xf, yf), this.grad(ba, xf - 1, yf), u),
            this.lerp(this.grad(ab, xf, yf - 1), this.grad(bb, xf - 1, yf - 1), u),
            v
        );
    }

    octave2D(x, y, octaves = 4, persistence = 0.5) {
        let total = 0, freq = 1, amp = 1, maxVal = 0;
        for (let i = 0; i < octaves; i++) {
            total += this.noise2D(x * freq, y * freq) * amp;
            maxVal += amp;
            amp *= persistence;
            freq *= 2;
        }
        return total / maxVal;
    }
}

// ============================================================
// World — voxel data & mesh generation
// ============================================================
const BLOCK = {
    AIR: 0, GRASS: 1, DIRT: 2, STONE: 3, SAND: 4, WATER: 5,
    WOOD_LOG: 6, WOOD_PLANK: 7, COBBLESTONE: 8, GLASS: 9,
    BRICK: 10, LEAVES: 11, CRAFTING_TABLE: 12
};
const BLOCK_NAMES = {
    [BLOCK.GRASS]: '草方块', [BLOCK.DIRT]: '泥土', [BLOCK.STONE]: '石头',
    [BLOCK.SAND]: '沙子', [BLOCK.WOOD_LOG]: '原木', [BLOCK.WOOD_PLANK]: '木板',
    [BLOCK.COBBLESTONE]: '圆石', [BLOCK.GLASS]: '玻璃', [BLOCK.BRICK]: '砖块',
    [BLOCK.LEAVES]: '树叶', [BLOCK.CRAFTING_TABLE]: '工作台'
};
const PLACEABLE_BLOCKS = [
    BLOCK.GRASS, BLOCK.DIRT, BLOCK.STONE, BLOCK.SAND,
    BLOCK.WOOD_LOG, BLOCK.WOOD_PLANK, BLOCK.COBBLESTONE,
    BLOCK.GLASS, BLOCK.BRICK, BLOCK.LEAVES, BLOCK.CRAFTING_TABLE
];
const TRANSPARENT_BLOCKS = new Set([BLOCK.AIR, BLOCK.WATER, BLOCK.GLASS, BLOCK.LEAVES]);
const WORLD_SIZE = 64;
const MAX_HEIGHT = 32;
const REACH_DISTANCE = 6;
const WORLD_SEED = 20260306;
const MULTIPLAYER_TICK_RATE = 12;

// Multi-face block types (need per-face materials like grass)
const MULTI_FACE_BLOCKS = new Set([BLOCK.GRASS, BLOCK.WOOD_LOG, BLOCK.CRAFTING_TABLE]);

// ============================================================
// Items & Equipment
// ============================================================
const ITEM = {
    WOOD_SWORD: 'wood_sword',
    STONE_SWORD: 'stone_sword',
    LEAF_HELMET: 'leaf_helmet',
    LEAF_CHESTPLATE: 'leaf_chestplate',
    LEAF_BOOTS: 'leaf_boots',
};

const ITEM_DEFS = {
    [ITEM.WOOD_SWORD]:      { name: '木剑',     slot: 'hand', color: '#b8934a', icon: '🗡️', stats: { attack: 3, defense: 0, speedBonus: 0 } },
    [ITEM.STONE_SWORD]:     { name: '石剑',     slot: 'hand', color: '#808080', icon: '⚔️', stats: { attack: 5, defense: 0, speedBonus: 0 } },
    [ITEM.LEAF_HELMET]:     { name: '树叶头盔', slot: 'head', color: '#3a7a20', icon: '🪖', stats: { attack: 0, defense: 2, speedBonus: 0 } },
    [ITEM.LEAF_CHESTPLATE]: { name: '树叶胸甲', slot: 'body', color: '#3a7a20', icon: '🛡️', stats: { attack: 0, defense: 3, speedBonus: 0 } },
    [ITEM.LEAF_BOOTS]:      { name: '树叶靴子', slot: 'feet', color: '#3a7a20', icon: '👢', stats: { attack: 0, defense: 1, speedBonus: 0.10 } },
};

const SLOT_NAMES = { head: '头部', body: '身体', feet: '脚部', hand: '手持' };

// ============================================================
// Crafting Recipes
// ============================================================
const RECIPES = [
    { type: 'shapeless', ingredients: [BLOCK.WOOD_LOG], result: BLOCK.WOOD_PLANK, count: 4 },
    { type: 'shaped', pattern: [[7, 7], [7, 7]], result: BLOCK.CRAFTING_TABLE, count: 1 },
    { type: 'shaped', pattern: [[3, 3], [3, 3]], result: BLOCK.BRICK, count: 4 },
    { type: 'shaped', pattern: [[3], [3], [3]], result: BLOCK.COBBLESTONE, count: 3 },
    { type: 'shaped', pattern: [[9, 9, 9], [9, 0, 9], [9, 9, 9]], result: BLOCK.GLASS, count: 4 },
    // Equipment recipes
    { type: 'shaped', pattern: [[6], [7]], result: ITEM.WOOD_SWORD, count: 1, isItem: true },
    { type: 'shaped', pattern: [[3], [8], [7]], result: ITEM.STONE_SWORD, count: 1, isItem: true },
    { type: 'shaped', pattern: [[11, 11, 11]], result: ITEM.LEAF_HELMET, count: 1, isItem: true },
    { type: 'shaped', pattern: [[11, 0, 11], [11, 11, 11]], result: ITEM.LEAF_CHESTPLATE, count: 1, isItem: true },
    { type: 'shaped', pattern: [[11, 0, 11]], result: ITEM.LEAF_BOOTS, count: 1, isItem: true },
];

function matchRecipe(grid) {
    // grid is 3x3 array: grid[row][col]
    for (const recipe of RECIPES) {
        if (recipe.type === 'shapeless') {
            const filled = [];
            for (let r = 0; r < 3; r++)
                for (let c = 0; c < 3; c++)
                    if (grid[r][c] !== 0) filled.push(grid[r][c]);
            if (filled.length === recipe.ingredients.length) {
                const sorted1 = [...filled].sort();
                const sorted2 = [...recipe.ingredients].sort();
                if (sorted1.every((v, i) => v === sorted2[i])) {
                    return { result: recipe.result, count: recipe.count, isItem: !!recipe.isItem };
                }
            }
        } else {
            // Shaped: try all offsets
            const pH = recipe.pattern.length;
            const pW = recipe.pattern[0].length;
            for (let dr = 0; dr <= 3 - pH; dr++) {
                for (let dc = 0; dc <= 3 - pW; dc++) {
                    let match = true;
                    for (let r = 0; r < 3 && match; r++) {
                        for (let c = 0; c < 3 && match; c++) {
                            const pr = r - dr, pc = c - dc;
                            const expected = (pr >= 0 && pr < pH && pc >= 0 && pc < pW) ? recipe.pattern[pr][pc] : 0;
                            if (grid[r][c] !== expected) match = false;
                        }
                    }
                    if (match) return { result: recipe.result, count: recipe.count, isItem: !!recipe.isItem };
                }
            }
        }
    }
    return null;
}

class World {
    constructor(seed = WORLD_SEED) {
        this.blocks = new Uint8Array(WORLD_SIZE * MAX_HEIGHT * WORLD_SIZE);
        this.noise = new SimpleNoise(seed);
        this.meshes = [];
    }

    idx(x, y, z) {
        return x + y * WORLD_SIZE + z * WORLD_SIZE * MAX_HEIGHT;
    }

    getBlock(x, y, z) {
        if (x < 0 || x >= WORLD_SIZE || y < 0 || y >= MAX_HEIGHT || z < 0 || z >= WORLD_SIZE) return BLOCK.AIR;
        return this.blocks[this.idx(x, y, z)];
    }

    setBlock(x, y, z, type) {
        if (x < 0 || x >= WORLD_SIZE || y < 0 || y >= MAX_HEIGHT || z < 0 || z >= WORLD_SIZE) return;
        this.blocks[this.idx(x, y, z)] = type;
    }

    generate() {
        const waterLevel = 8;
        for (let x = 0; x < WORLD_SIZE; x++) {
            for (let z = 0; z < WORLD_SIZE; z++) {
                const n = this.noise.octave2D(x * 0.02, z * 0.02, 4, 0.5);
                const height = Math.floor((n + 1) * 0.5 * 14) + 4;

                for (let y = 0; y < MAX_HEIGHT; y++) {
                    if (y === 0) {
                        this.setBlock(x, y, z, BLOCK.STONE);
                    } else if (y < height - 3) {
                        this.setBlock(x, y, z, BLOCK.STONE);
                    } else if (y < height) {
                        this.setBlock(x, y, z, BLOCK.DIRT);
                    } else if (y === height) {
                        if (height <= waterLevel) {
                            this.setBlock(x, y, z, BLOCK.SAND);
                        } else {
                            this.setBlock(x, y, z, BLOCK.GRASS);
                        }
                    } else if (y <= waterLevel) {
                        this.setBlock(x, y, z, BLOCK.WATER);
                    }
                }
            }
        }
    }

    generateTrees() {
        const waterLevel = 8;
        for (let x = 3; x < WORLD_SIZE - 3; x++) {
            for (let z = 3; z < WORLD_SIZE - 3; z++) {
                const surfaceY = this.getHeight(x, z);
                if (surfaceY <= waterLevel) continue;
                if (this.getBlock(x, surfaceY, z) !== BLOCK.GRASS) continue;

                // Use noise for density control (~5%)
                const treeNoise = this.noise.noise2D(x * 0.5, z * 0.5);
                if (treeNoise < 0.7) continue;

                // Check minimum spacing (3 blocks)
                let tooClose = false;
                for (let dx = -3; dx <= 3 && !tooClose; dx++) {
                    for (let dz = -3; dz <= 3 && !tooClose; dz++) {
                        if (dx === 0 && dz === 0) continue;
                        for (let dy = 1; dy <= 6; dy++) {
                            if (this.getBlock(x + dx, surfaceY + dy, z + dz) === BLOCK.WOOD_LOG) {
                                tooClose = true;
                                break;
                            }
                        }
                    }
                }
                if (tooClose) continue;

                this.placeTree(x, surfaceY, z);
            }
        }
    }

    placeTree(x, baseY, z) {
        const trunkHeight = 4 + (Math.random() * 3 | 0); // 4-6

        // Place trunk
        for (let dy = 1; dy <= trunkHeight; dy++) {
            this.setBlock(x, baseY + dy, z, BLOCK.WOOD_LOG);
        }

        // Place leaves (sphere-ish)
        const leafBase = baseY + trunkHeight - 1;
        for (let dy = 0; dy <= 3; dy++) {
            const radius = dy < 3 ? 2 : 1;
            for (let dx = -radius; dx <= radius; dx++) {
                for (let dz = -radius; dz <= radius; dz++) {
                    // Skip corners for rounder shape
                    if (Math.abs(dx) === radius && Math.abs(dz) === radius && dy < 2) continue;
                    if (dx === 0 && dz === 0 && dy < 2) continue; // Trunk space
                    const lx = x + dx, ly = leafBase + dy, lz = z + dz;
                    if (this.getBlock(lx, ly, lz) === BLOCK.AIR) {
                        this.setBlock(lx, ly, lz, BLOCK.LEAVES);
                    }
                }
            }
        }
    }

    getHeight(x, z) {
        const bx = Math.floor(x);
        const bz = Math.floor(z);
        if (bx < 0 || bx >= WORLD_SIZE || bz < 0 || bz >= WORLD_SIZE) return 0;
        for (let y = MAX_HEIGHT - 1; y >= 0; y--) {
            const b = this.getBlock(bx, y, bz);
            if (b !== BLOCK.AIR && b !== BLOCK.WATER) return y;
        }
        return 0;
    }

    isSolid(x, y, z) {
        const b = this.getBlock(Math.floor(x), Math.floor(y), Math.floor(z));
        return b !== BLOCK.AIR && b !== BLOCK.WATER;
    }

    buildMesh(scene) {
        this.meshes.forEach(m => scene.remove(m));
        this.meshes = [];

        const materials = {
            [BLOCK.GRASS]: [
                new THREE.MeshLambertMaterial({ map: TextureGen.grassSide() }),
                new THREE.MeshLambertMaterial({ map: TextureGen.grassSide() }),
                new THREE.MeshLambertMaterial({ map: TextureGen.grassTop() }),
                new THREE.MeshLambertMaterial({ map: TextureGen.dirt() }),
                new THREE.MeshLambertMaterial({ map: TextureGen.grassSide() }),
                new THREE.MeshLambertMaterial({ map: TextureGen.grassSide() }),
            ],
            [BLOCK.DIRT]: new THREE.MeshLambertMaterial({ map: TextureGen.dirt() }),
            [BLOCK.STONE]: new THREE.MeshLambertMaterial({ map: TextureGen.stone() }),
            [BLOCK.SAND]: new THREE.MeshLambertMaterial({ map: TextureGen.sand() }),
            [BLOCK.WATER]: new THREE.MeshLambertMaterial({ map: TextureGen.water(), transparent: true, opacity: 0.6 }),
            [BLOCK.WOOD_LOG]: [
                new THREE.MeshLambertMaterial({ map: TextureGen.woodLogSide() }),
                new THREE.MeshLambertMaterial({ map: TextureGen.woodLogSide() }),
                new THREE.MeshLambertMaterial({ map: TextureGen.woodLogTop() }),
                new THREE.MeshLambertMaterial({ map: TextureGen.woodLogTop() }),
                new THREE.MeshLambertMaterial({ map: TextureGen.woodLogSide() }),
                new THREE.MeshLambertMaterial({ map: TextureGen.woodLogSide() }),
            ],
            [BLOCK.WOOD_PLANK]: new THREE.MeshLambertMaterial({ map: TextureGen.woodPlank() }),
            [BLOCK.COBBLESTONE]: new THREE.MeshLambertMaterial({ map: TextureGen.cobblestone() }),
            [BLOCK.GLASS]: new THREE.MeshLambertMaterial({ map: TextureGen.glass(), transparent: true, opacity: 0.4 }),
            [BLOCK.BRICK]: new THREE.MeshLambertMaterial({ map: TextureGen.brick() }),
            [BLOCK.LEAVES]: new THREE.MeshLambertMaterial({ map: TextureGen.leaves(), transparent: true, opacity: 0.85 }),
            [BLOCK.CRAFTING_TABLE]: [
                new THREE.MeshLambertMaterial({ map: TextureGen.craftingTableSide() }),
                new THREE.MeshLambertMaterial({ map: TextureGen.craftingTableSide() }),
                new THREE.MeshLambertMaterial({ map: TextureGen.craftingTableTop() }),
                new THREE.MeshLambertMaterial({ map: TextureGen.woodPlank() }),
                new THREE.MeshLambertMaterial({ map: TextureGen.craftingTableSide() }),
                new THREE.MeshLambertMaterial({ map: TextureGen.craftingTableSide() }),
            ],
        };

        const faceNormals = [
            { dir: [1, 0, 0], corners: [[1, 0, 0], [1, 1, 0], [1, 1, 1], [1, 0, 1]], faceIdx: 0 },
            { dir: [-1, 0, 0], corners: [[0, 0, 1], [0, 1, 1], [0, 1, 0], [0, 0, 0]], faceIdx: 1 },
            { dir: [0, 1, 0], corners: [[0, 1, 1], [1, 1, 1], [1, 1, 0], [0, 1, 0]], faceIdx: 2 },
            { dir: [0, -1, 0], corners: [[0, 0, 0], [1, 0, 0], [1, 0, 1], [0, 0, 1]], faceIdx: 3 },
            { dir: [0, 0, 1], corners: [[1, 0, 1], [1, 1, 1], [0, 1, 1], [0, 0, 1]], faceIdx: 4 },
            { dir: [0, 0, -1], corners: [[0, 0, 0], [0, 1, 0], [1, 1, 0], [1, 0, 0]], faceIdx: 5 },
        ];

        const facesByBlock = {};

        for (let x = 0; x < WORLD_SIZE; x++) {
            for (let y = 0; y < MAX_HEIGHT; y++) {
                for (let z = 0; z < WORLD_SIZE; z++) {
                    const block = this.getBlock(x, y, z);
                    if (block === BLOCK.AIR) continue;

                    for (const face of faceNormals) {
                        const nx = x + face.dir[0];
                        const ny = y + face.dir[1];
                        const nz = z + face.dir[2];
                        const neighbor = this.getBlock(nx, ny, nz);

                        // Render face if neighbor is transparent,
                        // but don't render face between same transparent blocks
                        const shouldRender = TRANSPARENT_BLOCKS.has(neighbor) &&
                            !(TRANSPARENT_BLOCKS.has(block) && block === neighbor);

                        if (!shouldRender) continue;

                        if (!facesByBlock[block]) facesByBlock[block] = [];
                        facesByBlock[block].push({ x, y, z, face });
                    }
                }
            }
        }

        for (const [blockType, faces] of Object.entries(facesByBlock)) {
            const bt = parseInt(blockType);
            const positions = new Float32Array(faces.length * 4 * 3);
            const normals = new Float32Array(faces.length * 4 * 3);
            const uvs = new Float32Array(faces.length * 4 * 2);
            const indices = [];

            const uvCoords = [[1, 0], [1, 1], [0, 1], [0, 0]];

            for (let i = 0; i < faces.length; i++) {
                const { x, y, z, face } = faces[i];
                const base = i * 4;

                for (let c = 0; c < 4; c++) {
                    const vi = (base + c) * 3;
                    positions[vi] = x + face.corners[c][0];
                    positions[vi + 1] = y + face.corners[c][1];
                    positions[vi + 2] = z + face.corners[c][2];

                    normals[vi] = face.dir[0];
                    normals[vi + 1] = face.dir[1];
                    normals[vi + 2] = face.dir[2];

                    const ui = (base + c) * 2;
                    uvs[ui] = uvCoords[c][0];
                    uvs[ui + 1] = uvCoords[c][1];
                }

                indices.push(base, base + 1, base + 2, base, base + 2, base + 3);
            }

            const geom = new THREE.BufferGeometry();
            geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geom.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
            geom.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
            geom.setIndex(indices);

            let mat = materials[bt];
            let mesh;

            if (MULTI_FACE_BLOCKS.has(bt)) {
                // Rebuild with groups per face index for multi-face materials
                const groupedPositions = [];
                const groupedNormals = [];
                const groupedUvs = [];
                const groupedIndices = [];
                const groups = [[], [], [], [], [], []];

                for (let i = 0; i < faces.length; i++) {
                    groups[faces[i].face.faceIdx].push(i);
                }

                let vertexOffset = 0;
                let indexOffset = 0;

                for (let g = 0; g < 6; g++) {
                    const start = indexOffset;
                    for (const fi of groups[g]) {
                        const base = fi * 4;
                        for (let c = 0; c < 4; c++) {
                            const vi = (base + c) * 3;
                            groupedPositions.push(positions[vi], positions[vi + 1], positions[vi + 2]);
                            groupedNormals.push(normals[vi], normals[vi + 1], normals[vi + 2]);
                            const ui = (base + c) * 2;
                            groupedUvs.push(uvs[ui], uvs[ui + 1]);
                        }
                        groupedIndices.push(
                            vertexOffset, vertexOffset + 1, vertexOffset + 2,
                            vertexOffset, vertexOffset + 2, vertexOffset + 3
                        );
                        vertexOffset += 4;
                        indexOffset += 6;
                    }
                    const count = indexOffset - start;
                    if (count > 0) {
                        groups[g] = { start, count };
                    } else {
                        groups[g] = null;
                    }
                }

                const gGeom = new THREE.BufferGeometry();
                gGeom.setAttribute('position', new THREE.BufferAttribute(new Float32Array(groupedPositions), 3));
                gGeom.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(groupedNormals), 3));
                gGeom.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(groupedUvs), 2));
                gGeom.setIndex(groupedIndices);

                for (let g = 0; g < 6; g++) {
                    if (groups[g]) {
                        gGeom.addGroup(groups[g].start, groups[g].count, g);
                    }
                }

                mesh = new THREE.Mesh(gGeom, mat);
            } else {
                mesh = new THREE.Mesh(geom, mat);
            }

            // Transparent blocks render after opaque
            if (TRANSPARENT_BLOCKS.has(bt)) {
                mesh.renderOrder = 1;
            }

            mesh.castShadow = true;
            mesh.receiveShadow = true;
            scene.add(mesh);
            this.meshes.push(mesh);
        }
    }

    raycast(origin, direction, maxDist) {
        const dx = direction.x, dy = direction.y, dz = direction.z;
        let x = Math.floor(origin.x);
        let y = Math.floor(origin.y);
        let z = Math.floor(origin.z);

        const stepX = dx > 0 ? 1 : -1;
        const stepY = dy > 0 ? 1 : -1;
        const stepZ = dz > 0 ? 1 : -1;

        const tDeltaX = dx !== 0 ? Math.abs(1 / dx) : Infinity;
        const tDeltaY = dy !== 0 ? Math.abs(1 / dy) : Infinity;
        const tDeltaZ = dz !== 0 ? Math.abs(1 / dz) : Infinity;

        let tMaxX = dx !== 0 ? ((dx > 0 ? (x + 1 - origin.x) : (origin.x - x)) * tDeltaX) : Infinity;
        let tMaxY = dy !== 0 ? ((dy > 0 ? (y + 1 - origin.y) : (origin.y - y)) * tDeltaY) : Infinity;
        let tMaxZ = dz !== 0 ? ((dz > 0 ? (z + 1 - origin.z) : (origin.z - z)) * tDeltaZ) : Infinity;

        let t = 0;
        let faceNormal = [0, 0, 0];

        while (t < maxDist) {
            const block = this.getBlock(x, y, z);
            if (block !== BLOCK.AIR && block !== BLOCK.WATER) {
                return { hit: true, blockPos: [x, y, z], normal: faceNormal, block, t };
            }

            if (tMaxX < tMaxY) {
                if (tMaxX < tMaxZ) {
                    t = tMaxX;
                    tMaxX += tDeltaX;
                    faceNormal = [-stepX, 0, 0];
                    x += stepX;
                } else {
                    t = tMaxZ;
                    tMaxZ += tDeltaZ;
                    faceNormal = [0, 0, -stepZ];
                    z += stepZ;
                }
            } else {
                if (tMaxY < tMaxZ) {
                    t = tMaxY;
                    tMaxY += tDeltaY;
                    faceNormal = [0, -stepY, 0];
                    y += stepY;
                } else {
                    t = tMaxZ;
                    tMaxZ += tDeltaZ;
                    faceNormal = [0, 0, -stepZ];
                    z += stepZ;
                }
            }
        }
        return { hit: false };
    }
}

// ============================================================
// Player — movement, physics, collision
// ============================================================
class Player {
    constructor(camera, world) {
        this.camera = camera;
        this.world = world;

        this.position = new THREE.Vector3(WORLD_SIZE / 2, 0, WORLD_SIZE / 2);
        this.velocity = new THREE.Vector3(0, 0, 0);

        this.height = 1.7;
        this.eyeHeight = 1.6;
        this.width = 0.3;

        this.speed = 4.5;
        this.sprintSpeed = 7;
        this.baseSpeed = 4.5;
        this.baseSprintSpeed = 7;
        this.jumpForce = 8;
        this.gravity = -22;

        this.onGround = false;
        this.keys = {};

        // Equipment system
        this.equipment = { head: null, body: null, feet: null, hand: null };
        this.inventory = [];
        this.totalAttack = 0;
        this.totalDefense = 0;

        const h = this.world.getHeight(this.position.x, this.position.z);
        this.position.y = h + 1.01;

        this.setupInput();
    }

    setupInput() {
        document.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
        });
        document.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });
    }

    addToInventory(itemId) {
        this.inventory.push(itemId);
    }

    equip(itemId) {
        const def = ITEM_DEFS[itemId];
        if (!def) return false;
        const idx = this.inventory.indexOf(itemId);
        if (idx === -1) return false;
        // Unequip existing item in that slot
        if (this.equipment[def.slot]) {
            this.inventory.push(this.equipment[def.slot]);
        }
        this.inventory.splice(idx, 1);
        this.equipment[def.slot] = itemId;
        this.recalcStats();
        return true;
    }

    unequip(slot) {
        if (!this.equipment[slot]) return false;
        this.inventory.push(this.equipment[slot]);
        this.equipment[slot] = null;
        this.recalcStats();
        return true;
    }

    recalcStats() {
        let attack = 0, defense = 0, speedBonus = 0;
        for (const slot of Object.keys(this.equipment)) {
            const itemId = this.equipment[slot];
            if (!itemId) continue;
            const def = ITEM_DEFS[itemId];
            if (!def) continue;
            attack += def.stats.attack;
            defense += def.stats.defense;
            speedBonus += def.stats.speedBonus;
        }
        this.totalAttack = attack;
        this.totalDefense = defense;
        this.speed = this.baseSpeed * (1 + speedBonus);
        this.sprintSpeed = this.baseSprintSpeed * (1 + speedBonus);
    }

    getStats() {
        let speedBonus = 0;
        for (const slot of Object.keys(this.equipment)) {
            const itemId = this.equipment[slot];
            if (!itemId) continue;
            const def = ITEM_DEFS[itemId];
            if (def) speedBonus += def.stats.speedBonus;
        }
        return { attack: this.totalAttack, defense: this.totalDefense, speedBonus: Math.round(speedBonus * 100) };
    }

    update(dt, controls) {
        if (!controls.isLocked) return;

        dt = Math.min(dt, 0.1);

        const sprint = this.keys['ShiftLeft'] || this.keys['ShiftRight'];
        const moveSpeed = sprint ? this.sprintSpeed : this.speed;

        const forward = new THREE.Vector3();
        const right = new THREE.Vector3();
        this.camera.getWorldDirection(forward);
        forward.y = 0;
        forward.normalize();
        right.crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();

        const moveDir = new THREE.Vector3(0, 0, 0);
        if (this.keys['KeyW'] || this.keys['ArrowUp']) moveDir.add(forward);
        if (this.keys['KeyS'] || this.keys['ArrowDown']) moveDir.sub(forward);
        if (this.keys['KeyA'] || this.keys['ArrowLeft']) moveDir.sub(right);
        if (this.keys['KeyD'] || this.keys['ArrowRight']) moveDir.add(right);

        if (moveDir.lengthSq() > 0) moveDir.normalize();

        this.velocity.x = moveDir.x * moveSpeed;
        this.velocity.z = moveDir.z * moveSpeed;

        if ((this.keys['Space']) && this.onGround) {
            this.velocity.y = this.jumpForce;
            this.onGround = false;
        }

        this.velocity.y += this.gravity * dt;

        this.moveWithCollision(dt);

        this.camera.position.set(
            this.position.x,
            this.position.y + this.eyeHeight,
            this.position.z
        );
    }

    moveWithCollision(dt) {
        const eps = 0.001;

        this.position.x += this.velocity.x * dt;
        this.resolveCollisionAxis('x', eps);

        this.position.z += this.velocity.z * dt;
        this.resolveCollisionAxis('z', eps);

        this.position.y += this.velocity.y * dt;
        this.resolveCollisionAxis('y', eps);

        const feetY = this.position.y - eps * 2;
        const w = this.width;
        this.onGround = false;
        for (const [ox, oz] of [[-w, -w], [w, -w], [-w, w], [w, w]]) {
            if (this.world.isSolid(this.position.x + ox, feetY, this.position.z + oz)) {
                this.onGround = true;
                break;
            }
        }

        this.position.x = Math.max(this.width + eps, Math.min(WORLD_SIZE - this.width - eps, this.position.x));
        this.position.z = Math.max(this.width + eps, Math.min(WORLD_SIZE - this.width - eps, this.position.z));
        if (this.position.y < 0.01) {
            this.position.y = 0.01;
            this.velocity.y = 0;
            this.onGround = true;
        }
    }

    resolveCollisionAxis(axis, eps) {
        const w = this.width;
        const h = this.height;

        const minX = this.position.x - w;
        const maxX = this.position.x + w;
        const minY = this.position.y;
        const maxY = this.position.y + h;
        const minZ = this.position.z - w;
        const maxZ = this.position.z + w;

        const bx0 = Math.floor(minX), bx1 = Math.floor(maxX);
        const by0 = Math.floor(minY), by1 = Math.floor(maxY);
        const bz0 = Math.floor(minZ), bz1 = Math.floor(maxZ);

        for (let bx = bx0; bx <= bx1; bx++) {
            for (let by = by0; by <= by1; by++) {
                for (let bz = bz0; bz <= bz1; bz++) {
                    if (!this.world.isSolid(bx, by, bz)) continue;

                    const overlapX = Math.min(maxX, bx + 1) - Math.max(minX, bx);
                    const overlapY = Math.min(maxY, by + 1) - Math.max(minY, by);
                    const overlapZ = Math.min(maxZ, bz + 1) - Math.max(minZ, bz);

                    if (overlapX <= 0 || overlapY <= 0 || overlapZ <= 0) continue;

                    if (axis === 'x') {
                        if (this.velocity.x > 0) {
                            this.position.x = bx - w - eps;
                        } else {
                            this.position.x = bx + 1 + w + eps;
                        }
                        this.velocity.x = 0;
                        return;
                    } else if (axis === 'y') {
                        if (this.velocity.y > 0) {
                            this.position.y = by - h - eps;
                        } else {
                            this.position.y = by + 1 + eps;
                        }
                        this.velocity.y = 0;
                        return;
                    } else if (axis === 'z') {
                        if (this.velocity.z > 0) {
                            this.position.z = bz - w - eps;
                        } else {
                            this.position.z = bz + 1 + w + eps;
                        }
                        this.velocity.z = 0;
                        return;
                    }
                }
            }
        }
    }

    checkCollision(pos) {
        const w = this.width;
        const minX = pos.x - w, maxX = pos.x + w;
        const minY = pos.y, maxY = pos.y + this.height;
        const minZ = pos.z - w, maxZ = pos.z + w;

        const bx0 = Math.floor(minX), bx1 = Math.floor(maxX);
        const by0 = Math.floor(minY), by1 = Math.floor(maxY);
        const bz0 = Math.floor(minZ), bz1 = Math.floor(maxZ);

        for (let bx = bx0; bx <= bx1; bx++) {
            for (let by = by0; by <= by1; by++) {
                for (let bz = bz0; bz <= bz1; bz++) {
                    if (this.world.isSolid(bx, by, bz)) return true;
                }
            }
        }
        return false;
    }
}

// ============================================================
// Multiplayer client
// ============================================================
class MultiplayerClient {
    constructor(game) {
        this.game = game;
        this.clientId = null;
        this.name = '';
        this.players = new Map();
        this.lastStateSend = 0;
        this.lastPoll = 0;
        this.lastSeq = 0;
        this.connected = false;
    }

    async connect(name) {
        this.name = name;
        this.game.setMultiplayerStatus('正在连接服务器...');
        try {
            const resp = await fetch('/api/join', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: this.name }),
            });
            const data = await resp.json();
            if (!resp.ok || !data.ok) throw new Error(data.message || 'join failed');
            this.clientId = data.id;
            this.connected = true;
            this.lastSeq = data.seq || 0;
            this.game.setMultiplayerStatus(`在线模式：${this.name}`);
            this.game.updateOnlineCount(data.onlineCount || 1);
            this.updatePlayers(data.players || []);
        } catch {
            this.connected = false;
            this.game.setMultiplayerStatus('连接失败，请先启动 node server.js');
        }
    }

    async post(path, payload) {
        const resp = await fetch(path, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        if (!resp.ok) throw new Error('request failed');
        return resp.json();
    }

    async poll() {
        if (!this.connected) return;
        try {
            const resp = await fetch(`/api/snapshot?since=${this.lastSeq}`);
            const data = await resp.json();
            if (!resp.ok || !data.ok) return;
            this.lastSeq = data.seq || this.lastSeq;
            this.updatePlayers(data.players || []);
            this.game.updateOnlineCount(data.onlineCount || 1);
            for (const update of data.updates || []) {
                if (update.playerId === this.clientId) continue;
                this.game.applyRemoteBlockUpdate(update.x, update.y, update.z, update.block);
            }
        } catch {
            this.connected = false;
            this.game.setMultiplayerStatus('连接中断，请刷新重试');
        }
    }

    update(dt) {
        if (!this.connected || !this.clientId) return;
        this.lastStateSend += dt;
        this.lastPoll += dt;

        if (this.lastStateSend >= 1 / MULTIPLAYER_TICK_RATE) {
            this.lastStateSend = 0;
            const p = this.game.player.position;
            const dir = new THREE.Vector3();
            this.game.camera.getWorldDirection(dir);
            this.post('/api/state', {
                id: this.clientId,
                x: p.x,
                y: p.y,
                z: p.z,
                yaw: Math.atan2(-dir.x, -dir.z),
            }).catch(() => {});
        }

        if (this.lastPoll >= 0.2) {
            this.lastPoll = 0;
            this.poll();
        }
    }

    updatePlayers(players) {
        const seen = new Set();
        for (const data of players) {
            if (!data || data.id === this.clientId) continue;
            seen.add(data.id);
            let remote = this.players.get(data.id);
            if (!remote) {
                remote = this.game.createRemotePlayer(data.name || '玩家');
                this.players.set(data.id, remote);
            }
            this.game.updateRemotePlayer(remote, data);
        }

        for (const [id, remote] of this.players.entries()) {
            if (!seen.has(id)) {
                this.game.removeRemotePlayer(remote);
                this.players.delete(id);
            }
        }
    }

    sendBlockUpdate(x, y, z, block) {
        if (!this.connected || !this.clientId) return;
        this.post('/api/block-update', { id: this.clientId, x, y, z, block }).catch(() => {});
    }
}

// ============================================================
// Game — main application
// ============================================================
class Game {
    constructor() {
        this.clock = new THREE.Clock();
        this.selectedBlockIdx = 0;
        this.highlightMesh = null;
        this.targetBlock = null;
        this.meshDirty = false;
        this.craftingOpen = false;
        this.equipmentOpen = false;
        this.craftingGrid = [[0,0,0],[0,0,0],[0,0,0]];
        this.selectedMaterial = 0; // Currently selected material for crafting
        this.remotePlayersGroup = new THREE.Group();
        this.remoteName = null;
        this.multiplayer = new MultiplayerClient(this);
        this.init();
    }

    init() {
        // Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setClearColor(0x87CEEB);
        document.body.appendChild(this.renderer.domElement);

        // Scene
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0x87CEEB, 40, 70);

        // Camera
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);

        // Lighting
        this.setupLighting();

        // Sky
        this.setupSky();

        // World
        this.world = new World(WORLD_SEED);
        this.world.generate();
        this.world.generateTrees();
        this.world.buildMesh(this.scene);
        this.scene.add(this.remotePlayersGroup);

        // Player
        this.player = new Player(this.camera, this.world);

        // Controls
        this.controls = new PointerLockControls(this.camera, document.body);

        // Block highlight wireframe
        this.setupHighlight();

        // Hotbar
        this.setupHotbar();

        // Block interaction (mouse)
        this.setupBlockInteraction();

        // Crafting UI
        this.setupCraftingUI();

        // Equipment UI
        this.setupEquipmentUI();

        // Multiplayer UI
        this.setupMultiplayerUI();

        // UI
        this.setupUI();

        // Resize
        window.addEventListener('resize', () => this.onResize());

        // Start loop
        this.animate();
    }

    setupLighting() {
        const ambient = new THREE.AmbientLight(0x8899aa, 0.6);
        this.scene.add(ambient);

        const hemi = new THREE.HemisphereLight(0x87CEEB, 0x556B2F, 0.4);
        this.scene.add(hemi);

        const sun = new THREE.DirectionalLight(0xFFF5E0, 1.0);
        sun.position.set(30, 50, 20);
        sun.castShadow = true;
        sun.shadow.mapSize.width = 2048;
        sun.shadow.mapSize.height = 2048;
        sun.shadow.camera.near = 1;
        sun.shadow.camera.far = 100;
        sun.shadow.camera.left = -40;
        sun.shadow.camera.right = 40;
        sun.shadow.camera.top = 40;
        sun.shadow.camera.bottom = -40;
        this.scene.add(sun);
    }

    setupSky() {
        const skyGeo = new THREE.SphereGeometry(90, 32, 15);
        const skyMat = new THREE.ShaderMaterial({
            uniforms: {
                topColor: { value: new THREE.Color(0x0077ff) },
                bottomColor: { value: new THREE.Color(0x87CEEB) },
                offset: { value: 10 },
                exponent: { value: 0.6 },
            },
            vertexShader: `
                varying vec3 vWorldPosition;
                void main() {
                    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
                    vWorldPosition = worldPosition.xyz;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 topColor;
                uniform vec3 bottomColor;
                uniform float offset;
                uniform float exponent;
                varying vec3 vWorldPosition;
                void main() {
                    float h = normalize(vWorldPosition + offset).y;
                    gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
                }
            `,
            side: THREE.BackSide,
        });
        this.scene.add(new THREE.Mesh(skyGeo, skyMat));
    }

    setupHighlight() {
        const geo = new THREE.BoxGeometry(1.005, 1.005, 1.005);
        const mat = new THREE.MeshBasicMaterial({
            color: 0x000000,
            wireframe: true,
            transparent: true,
            opacity: 0.4,
            depthTest: true,
        });
        this.highlightMesh = new THREE.Mesh(geo, mat);
        this.highlightMesh.visible = false;
        this.scene.add(this.highlightMesh);
    }

    setupHotbar() {
        const hotbar = document.createElement('div');
        hotbar.id = 'hotbar';
        document.body.appendChild(hotbar);

        const colors = {
            [BLOCK.GRASS]: '#5a8c2a',
            [BLOCK.DIRT]: '#8b6914',
            [BLOCK.STONE]: '#808080',
            [BLOCK.SAND]: '#d4b96a',
            [BLOCK.WOOD_LOG]: '#6b4226',
            [BLOCK.WOOD_PLANK]: '#b8934a',
            [BLOCK.COBBLESTONE]: '#777',
            [BLOCK.GLASS]: '#c8e6ff',
            [BLOCK.BRICK]: '#a05030',
            [BLOCK.LEAVES]: '#3a7a20',
            [BLOCK.CRAFTING_TABLE]: '#8b6914',
        };

        // Key labels: 1-9, 0, -
        const keyLabels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-'];

        PLACEABLE_BLOCKS.forEach((blockType, i) => {
            const slot = document.createElement('div');
            slot.className = 'hotbar-slot' + (i === 0 ? ' active' : '');
            slot.dataset.index = i;

            const canvas = document.createElement('canvas');
            canvas.width = 32;
            canvas.height = 32;
            const ctx = canvas.getContext('2d');

            ctx.fillStyle = colors[blockType] || '#888';
            ctx.fillRect(2, 2, 28, 28);
            for (let p = 0; p < 30; p++) {
                ctx.fillStyle = `rgba(${Math.random() > 0.5 ? 255 : 0},${Math.random() > 0.5 ? 255 : 0},${Math.random() > 0.5 ? 255 : 0},0.08)`;
                ctx.fillRect(2 + Math.random() * 28 | 0, 2 + Math.random() * 28 | 0, 2, 2);
            }

            slot.appendChild(canvas);

            const label = document.createElement('span');
            label.className = 'hotbar-label';
            label.textContent = BLOCK_NAMES[blockType];
            slot.appendChild(label);

            const keyHint = document.createElement('span');
            keyHint.className = 'hotbar-key';
            keyHint.textContent = keyLabels[i] || '';
            slot.appendChild(keyHint);

            hotbar.appendChild(slot);
        });

        // Key selection: 1-9 for first 9, 0 for 10th, - for 11th
        document.addEventListener('keydown', (e) => {
            if (this.craftingOpen || this.equipmentOpen) return;
            if (e.key >= '1' && e.key <= '9') {
                const idx = parseInt(e.key) - 1;
                if (idx < PLACEABLE_BLOCKS.length) this.selectBlock(idx);
            } else if (e.key === '0' && PLACEABLE_BLOCKS.length > 9) {
                this.selectBlock(9);
            } else if (e.key === '-' && PLACEABLE_BLOCKS.length > 10) {
                this.selectBlock(10);
            }
        });

        // Scroll wheel selection
        document.addEventListener('wheel', (e) => {
            if (!this.controls.isLocked) return;
            e.preventDefault();
            const dir = e.deltaY > 0 ? 1 : -1;
            let idx = this.selectedBlockIdx + dir;
            if (idx < 0) idx = PLACEABLE_BLOCKS.length - 1;
            if (idx >= PLACEABLE_BLOCKS.length) idx = 0;
            this.selectBlock(idx);
        }, { passive: false });
    }

    selectBlock(idx) {
        this.selectedBlockIdx = idx;
        const slots = document.querySelectorAll('.hotbar-slot');
        slots.forEach((s, i) => s.classList.toggle('active', i === idx));
    }

    setupBlockInteraction() {
        document.addEventListener('mousedown', (e) => {
            if (!this.controls.isLocked) return;

            const dir = new THREE.Vector3();
            this.camera.getWorldDirection(dir);

            const result = this.world.raycast(this.camera.position, dir, REACH_DISTANCE);
            if (!result.hit) return;

            if (e.button === 0) {
                // Left click — destroy block
                const [bx, by, bz] = result.blockPos;
                this.world.setBlock(bx, by, bz, BLOCK.AIR);
                this.meshDirty = true;
                this.multiplayer.sendBlockUpdate(bx, by, bz, BLOCK.AIR);
            } else if (e.button === 2) {
                // Right click — check if clicking crafting table
                const [bx, by, bz] = result.blockPos;
                if (result.block === BLOCK.CRAFTING_TABLE) {
                    this.openCrafting();
                    return;
                }

                // Place block
                const [nx, ny, nz] = result.normal;
                const px = bx + nx, py = by + ny, pz = bz + nz;

                // Don't place inside the player
                const pp = this.player.position;
                const pw = this.player.width;
                const playerMinX = pp.x - pw, playerMaxX = pp.x + pw;
                const playerMinZ = pp.z - pw, playerMaxZ = pp.z + pw;
                const playerMinY = pp.y, playerMaxY = pp.y + this.player.height;

                if (px + 1 > playerMinX && px < playerMaxX &&
                    py + 1 > playerMinY && py < playerMaxY &&
                    pz + 1 > playerMinZ && pz < playerMaxZ) {
                    return;
                }

                const blockToPlace = PLACEABLE_BLOCKS[this.selectedBlockIdx];
                this.world.setBlock(px, py, pz, blockToPlace);
                this.meshDirty = true;
                this.multiplayer.sendBlockUpdate(px, py, pz, blockToPlace);
            }
        });

        document.addEventListener('contextmenu', (e) => e.preventDefault());
    }

    // ============================================================
    // Crafting System
    // ============================================================
    setupCraftingUI() {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.id = 'crafting-overlay';
        overlay.innerHTML = `
            <div id="crafting-window">
                <div class="crafting-title">工作台</div>
                <div class="crafting-body">
                    <div class="crafting-grid-area">
                        <div class="crafting-grid" id="crafting-grid"></div>
                    </div>
                    <div class="crafting-arrow">➡</div>
                    <div class="crafting-result-area">
                        <div class="craft-slot result-slot" id="crafting-result"></div>
                        <button id="craft-btn" disabled>合成</button>
                    </div>
                </div>
                <div class="material-palette" id="material-palette"></div>
                <div class="crafting-footer">
                    <span class="craft-hint">选择材料后点击网格放入 | 右键格子可清除</span>
                    <button id="craft-close-btn">关闭</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        // Build 3x3 grid
        const gridEl = document.getElementById('crafting-grid');
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                const slot = document.createElement('div');
                slot.className = 'craft-slot';
                slot.dataset.row = r;
                slot.dataset.col = c;
                slot.addEventListener('click', () => this.onGridSlotClick(r, c));
                slot.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    this.clearGridSlot(r, c);
                });
                gridEl.appendChild(slot);
            }
        }

        // Build material palette
        const palette = document.getElementById('material-palette');
        const allBlocks = [BLOCK.WOOD_LOG, BLOCK.WOOD_PLANK, BLOCK.STONE, BLOCK.COBBLESTONE,
                           BLOCK.DIRT, BLOCK.SAND, BLOCK.GLASS, BLOCK.BRICK, BLOCK.LEAVES];

        const blockColors = {
            [BLOCK.GRASS]: '#5a8c2a', [BLOCK.DIRT]: '#8b6914', [BLOCK.STONE]: '#808080',
            [BLOCK.SAND]: '#d4b96a', [BLOCK.WOOD_LOG]: '#6b4226', [BLOCK.WOOD_PLANK]: '#b8934a',
            [BLOCK.COBBLESTONE]: '#777', [BLOCK.GLASS]: '#c8e6ff', [BLOCK.BRICK]: '#a05030',
            [BLOCK.LEAVES]: '#3a7a20', [BLOCK.CRAFTING_TABLE]: '#8b6914',
        };

        allBlocks.forEach((bt) => {
            const item = document.createElement('div');
            item.className = 'palette-item';
            item.dataset.block = bt;
            item.title = BLOCK_NAMES[bt];

            const swatch = document.createElement('div');
            swatch.className = 'palette-swatch';
            swatch.style.background = blockColors[bt] || '#888';
            item.appendChild(swatch);

            const lbl = document.createElement('span');
            lbl.textContent = BLOCK_NAMES[bt];
            item.appendChild(lbl);

            item.addEventListener('click', () => {
                this.selectedMaterial = bt;
                palette.querySelectorAll('.palette-item').forEach(el =>
                    el.classList.toggle('selected', parseInt(el.dataset.block) === bt));
            });
            palette.appendChild(item);
        });

        // Select first by default
        this.selectedMaterial = allBlocks[0];
        palette.querySelector('.palette-item').classList.add('selected');

        // Craft button
        document.getElementById('craft-btn').addEventListener('click', () => this.doCraft());

        // Close button
        document.getElementById('craft-close-btn').addEventListener('click', () => this.closeCrafting());

        // Esc to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.craftingOpen) {
                this.closeCrafting();
            }
            if (e.key === 'Escape' && this.equipmentOpen) {
                this.closeEquipment();
            }
            if ((e.key === 'e' || e.key === 'E') && !this.craftingOpen) {
                if (this.equipmentOpen) {
                    this.closeEquipment();
                } else if (this.controls.isLocked) {
                    this.openEquipment();
                }
            }
        });
    }

    onGridSlotClick(row, col) {
        if (this.selectedMaterial) {
            this.craftingGrid[row][col] = this.selectedMaterial;
            this.updateCraftingDisplay();
        }
    }

    clearGridSlot(row, col) {
        this.craftingGrid[row][col] = 0;
        this.updateCraftingDisplay();
    }

    updateCraftingDisplay() {
        const blockColors = {
            [BLOCK.GRASS]: '#5a8c2a', [BLOCK.DIRT]: '#8b6914', [BLOCK.STONE]: '#808080',
            [BLOCK.SAND]: '#d4b96a', [BLOCK.WOOD_LOG]: '#6b4226', [BLOCK.WOOD_PLANK]: '#b8934a',
            [BLOCK.COBBLESTONE]: '#777', [BLOCK.GLASS]: '#c8e6ff', [BLOCK.BRICK]: '#a05030',
            [BLOCK.LEAVES]: '#3a7a20', [BLOCK.CRAFTING_TABLE]: '#8b6914',
        };

        const gridEl = document.getElementById('crafting-grid');
        const slots = gridEl.children;
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                const slot = slots[r * 3 + c];
                const bt = this.craftingGrid[r][c];
                if (bt !== 0) {
                    slot.style.background = blockColors[bt] || '#888';
                    slot.title = BLOCK_NAMES[bt] || '';
                } else {
                    slot.style.background = '';
                    slot.title = '';
                }
            }
        }

        // Check recipe
        const result = matchRecipe(this.craftingGrid);
        const resultSlot = document.getElementById('crafting-result');
        const craftBtn = document.getElementById('craft-btn');

        if (result) {
            if (result.isItem) {
                const def = ITEM_DEFS[result.result];
                resultSlot.style.background = def.color;
                resultSlot.title = def.name;
                resultSlot.textContent = def.icon;
                resultSlot.style.fontSize = '28px';
            } else {
                resultSlot.style.background = blockColors[result.result] || '#888';
                resultSlot.title = `${BLOCK_NAMES[result.result]} x${result.count}`;
                resultSlot.textContent = `x${result.count}`;
                resultSlot.style.fontSize = '';
            }
            craftBtn.disabled = false;
            this._pendingResult = result;
        } else {
            resultSlot.style.background = '';
            resultSlot.title = '';
            resultSlot.textContent = '';
            resultSlot.style.fontSize = '';
            craftBtn.disabled = true;
            this._pendingResult = null;
        }
    }

    doCraft() {
        if (!this._pendingResult) return;

        if (this._pendingResult.isItem) {
            const def = ITEM_DEFS[this._pendingResult.result];
            this.player.addToInventory(this._pendingResult.result);
            this.showCraftToast(`合成成功：${def.name} → 背包`);
        } else {
            const name = BLOCK_NAMES[this._pendingResult.result];
            const count = this._pendingResult.count;
            this.showCraftToast(`合成成功：${name} x${count}`);
        }

        // Clear grid
        this.craftingGrid = [[0,0,0],[0,0,0],[0,0,0]];
        this.updateCraftingDisplay();
    }

    showCraftToast(message) {
        const existing = document.querySelector('.craft-toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'craft-toast';
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }

    openCrafting() {
        this.craftingOpen = true;
        this.controls.unlock();
        document.getElementById('crafting-overlay').classList.add('visible');
        this.craftingGrid = [[0,0,0],[0,0,0],[0,0,0]];
        this.updateCraftingDisplay();
    }

    closeCrafting() {
        this.craftingOpen = false;
        document.getElementById('crafting-overlay').classList.remove('visible');
        // Re-lock after a short delay to avoid immediate re-trigger
        setTimeout(() => {
            if (!this.craftingOpen && !this.equipmentOpen) {
                this.controls.lock();
            }
        }, 100);
    }

    setupEquipmentUI() {
        const overlay = document.createElement('div');
        overlay.id = 'equipment-overlay';
        overlay.innerHTML = `
            <div id="equipment-window">
                <div class="equip-title">装备面板</div>
                <div class="equip-body">
                    <div class="equip-slots">
                        <div class="equip-slot" data-slot="head"><div class="slot-label">${SLOT_NAMES.head}</div><div class="slot-icon" id="eslot-head"></div></div>
                        <div class="equip-slot" data-slot="body"><div class="slot-label">${SLOT_NAMES.body}</div><div class="slot-icon" id="eslot-body"></div></div>
                        <div class="equip-slot" data-slot="feet"><div class="slot-label">${SLOT_NAMES.feet}</div><div class="slot-icon" id="eslot-feet"></div></div>
                        <div class="equip-slot" data-slot="hand"><div class="slot-label">${SLOT_NAMES.hand}</div><div class="slot-icon" id="eslot-hand"></div></div>
                    </div>
                    <div class="equip-stats" id="equip-stats">
                        <div class="stat-row"><span>⚔ 攻击力</span><span id="stat-attack">0</span></div>
                        <div class="stat-row"><span>🛡 防御力</span><span id="stat-defense">0</span></div>
                        <div class="stat-row"><span>💨 速度加成</span><span id="stat-speed">+0%</span></div>
                    </div>
                </div>
                <div class="equip-inv-title">背包</div>
                <div class="equip-inventory" id="equip-inventory"></div>
                <div class="equip-footer">
                    <span class="equip-hint">点击背包物品穿戴 · 点击装备槽卸下</span>
                    <button id="equip-close-btn">关闭</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        // Slot click → unequip
        overlay.querySelectorAll('.equip-slot').forEach(el => {
            el.addEventListener('click', () => {
                const slot = el.dataset.slot;
                if (this.player.unequip(slot)) {
                    this.updateEquipmentDisplay();
                }
            });
        });

        // Close button
        document.getElementById('equip-close-btn').addEventListener('click', () => this.closeEquipment());
    }

    openEquipment() {
        this.equipmentOpen = true;
        this.controls.unlock();
        document.getElementById('equipment-overlay').classList.add('visible');
        this.updateEquipmentDisplay();
    }

    closeEquipment() {
        this.equipmentOpen = false;
        document.getElementById('equipment-overlay').classList.remove('visible');
        setTimeout(() => {
            if (!this.craftingOpen && !this.equipmentOpen) {
                this.controls.lock();
            }
        }, 100);
    }

    updateEquipmentDisplay() {
        // Update slots
        for (const slot of ['head', 'body', 'feet', 'hand']) {
            const el = document.getElementById(`eslot-${slot}`);
            const itemId = this.player.equipment[slot];
            if (itemId) {
                const def = ITEM_DEFS[itemId];
                el.textContent = def.icon;
                el.style.background = def.color;
                el.title = def.name;
            } else {
                el.textContent = '';
                el.style.background = '';
                el.title = '';
            }
        }

        // Update stats
        const stats = this.player.getStats();
        document.getElementById('stat-attack').textContent = stats.attack;
        document.getElementById('stat-defense').textContent = stats.defense;
        document.getElementById('stat-speed').textContent = `+${stats.speedBonus}%`;

        // Update inventory grid
        const invEl = document.getElementById('equip-inventory');
        invEl.innerHTML = '';
        if (this.player.inventory.length === 0) {
            invEl.innerHTML = '<div class="inv-empty">背包为空</div>';
            return;
        }
        this.player.inventory.forEach((itemId, idx) => {
            const def = ITEM_DEFS[itemId];
            if (!def) return;
            const item = document.createElement('div');
            item.className = 'inv-item';
            item.style.borderColor = def.color;
            item.innerHTML = `<span class="inv-icon">${def.icon}</span><span class="inv-name">${def.name}</span>`;
            item.title = `${def.name} (${SLOT_NAMES[def.slot]})`;
            item.addEventListener('click', () => {
                this.player.equip(itemId);
                this.updateEquipmentDisplay();
            });
            invEl.appendChild(item);
        });
    }

    setupUI() {
        const blocker = document.getElementById('blocker');
        const crosshair = document.getElementById('crosshair');
        const debugInfo = document.getElementById('debug-info');
        const hotbar = document.getElementById('hotbar');

        blocker.addEventListener('click', () => {
            if (!this.remoteName) return;
            this.controls.lock();
        });

        this.controls.addEventListener('lock', () => {
            blocker.classList.add('hidden');
            crosshair.classList.add('visible');
            debugInfo.classList.add('visible');
            hotbar.classList.add('visible');
        });

        this.controls.addEventListener('unlock', () => {
            if (!this.craftingOpen && !this.equipmentOpen) {
                blocker.classList.remove('hidden');
                crosshair.classList.remove('visible');
                debugInfo.classList.remove('visible');
                hotbar.classList.remove('visible');
            } else {
                // Hide crosshair but keep debug/hotbar
                crosshair.classList.remove('visible');
            }
        });
    }

    setupMultiplayerUI() {
        const blocker = document.getElementById('blocker');
        const nameInput = document.getElementById('player-name');
        const joinBtn = document.getElementById('join-btn');
        const joinHint = document.getElementById('join-hint');

        const submitJoin = async () => {
            const rawName = nameInput.value.trim();
            const safeName = (rawName || `玩家${Math.floor(Math.random() * 9999)}`).slice(0, 16);
            if (!safeName) return;
            joinBtn.disabled = true;
            nameInput.disabled = true;
            joinHint.textContent = '正在连接多人服务器...';
            await this.multiplayer.connect(safeName);
            if (!this.multiplayer.connected) {
                joinBtn.disabled = false;
                nameInput.disabled = false;
                joinHint.textContent = '连接失败，请确认服务器已启动后重试';
                return;
            }
            this.remoteName = safeName;
            joinHint.textContent = `欢迎，${safeName}！点击屏幕开始游戏`;
            blocker.classList.add('ready-to-play');
        };

        joinBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            submitJoin();
        });

        nameInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                submitJoin();
            }
        });

        blocker.addEventListener('click', () => {
            if (!this.remoteName) {
                joinHint.textContent = '请先输入名字并点击“进入多人世界”';
            }
        });
    }

    setMultiplayerStatus(text) {
        const el = document.getElementById('mp-status');
        if (el) el.textContent = text;
    }

    updateOnlineCount(count) {
        const el = document.getElementById('mp-online-count');
        if (el) el.textContent = `${count}`;
    }

    applyRemoteBlockUpdate(x, y, z, block) {
        this.world.setBlock(x, y, z, block);
        this.meshDirty = true;
    }

    createRemotePlayer(name) {
        const group = new THREE.Group();

        const body = new THREE.Mesh(
            new THREE.BoxGeometry(0.6, 1.2, 0.4),
            new THREE.MeshLambertMaterial({ color: 0x3b82f6 })
        );
        body.position.y = 0.6;

        const head = new THREE.Mesh(
            new THREE.BoxGeometry(0.45, 0.45, 0.45),
            new THREE.MeshLambertMaterial({ color: 0xfde68a })
        );
        head.position.y = 1.45;

        const label = this.makeNameSprite(name);
        label.position.y = 2.0;

        group.add(body, head, label);
        this.remotePlayersGroup.add(group);
        return { group, label };
    }

    makeNameSprite(name) {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'rgba(0,0,0,0.55)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 28px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(name, canvas.width / 2, canvas.height / 2);

        const texture = new THREE.CanvasTexture(canvas);
        texture.minFilter = THREE.LinearFilter;
        const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false });
        const sprite = new THREE.Sprite(material);
        sprite.scale.set(2.6, 0.65, 1);
        return sprite;
    }

    updateRemotePlayer(remote, data) {
        remote.group.position.set(data.x, data.y, data.z);
        remote.group.rotation.y = data.yaw || 0;
    }

    removeRemotePlayer(remote) {
        this.remotePlayersGroup.remove(remote.group);
        remote.group.traverse((obj) => {
            if (obj.material && obj.material.map) obj.material.map.dispose();
            if (obj.material) obj.material.dispose();
            if (obj.geometry) obj.geometry.dispose();
        });
    }

    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    updateHighlight() {
        const dir = new THREE.Vector3();
        this.camera.getWorldDirection(dir);
        const result = this.world.raycast(this.camera.position, dir, REACH_DISTANCE);

        if (result.hit) {
            const [bx, by, bz] = result.blockPos;
            this.highlightMesh.position.set(bx + 0.5, by + 0.5, bz + 0.5);
            this.highlightMesh.visible = true;
            this.targetBlock = result;
        } else {
            this.highlightMesh.visible = false;
            this.targetBlock = null;
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const dt = this.clock.getDelta();

        this.player.update(dt, this.controls);
        this.multiplayer.update(dt);

        if (this.meshDirty) {
            this.world.buildMesh(this.scene);
            this.meshDirty = false;
        }

        if (this.controls.isLocked) {
            this.updateHighlight();
        }

        const pos = this.player.position;
        const blockName = BLOCK_NAMES[PLACEABLE_BLOCKS[this.selectedBlockIdx]];
        const debug = document.getElementById('debug-info');
        const stats = this.player.getStats();
        const equipLine = (stats.attack || stats.defense || stats.speedBonus)
            ? `<br>⚔${stats.attack} 🛡${stats.defense} 💨+${stats.speedBonus}%` : '';
        debug.innerHTML =
            `XYZ: ${pos.x.toFixed(1)} / ${pos.y.toFixed(1)} / ${pos.z.toFixed(1)}<br>` +
            `FPS: ${(1 / Math.max(dt, 0.001)).toFixed(0)}<br>` +
            `手持: ${blockName}` + equipLine;

        this.renderer.render(this.scene, this.camera);
    }
}

// ============================================================
// Start
// ============================================================
const MOBILE_LOOK_SENSITIVITY = 0.0032;
const MOBILE_PITCH_LIMIT = Math.PI / 2 - 0.05;
const MOBILE_JOYSTICK_RADIUS = 42;

const originalGameInit = Game.prototype.init;
const originalGameSetupUI = Game.prototype.setupUI;
const originalGameSetupHotbar = Game.prototype.setupHotbar;
const originalGameOpenCrafting = Game.prototype.openCrafting;
const originalGameCloseCrafting = Game.prototype.closeCrafting;
const originalGameOpenEquipment = Game.prototype.openEquipment;
const originalGameCloseEquipment = Game.prototype.closeEquipment;

Player.prototype.setTouchInput = function (nextInput) {
    this.touchInput = nextInput || { moveX: 0, moveY: 0, sprint: false, jump: false };
};

Player.prototype.update = function (dt, controls) {
    const mobileActive = !!controls.mobileActive;
    if (!controls.isLocked && !mobileActive) return;

    const touchInput = this.touchInput || { moveX: 0, moveY: 0, sprint: false, jump: false };

    dt = Math.min(dt, 0.1);

    const sprint = this.keys['ShiftLeft'] || this.keys['ShiftRight'] || touchInput.sprint;
    const moveSpeed = sprint ? this.sprintSpeed : this.speed;

    const forward = new THREE.Vector3();
    const right = new THREE.Vector3();
    this.camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();
    right.crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();

    const moveDir = new THREE.Vector3(0, 0, 0);
    if (this.keys['KeyW'] || this.keys['ArrowUp']) moveDir.add(forward);
    if (this.keys['KeyS'] || this.keys['ArrowDown']) moveDir.sub(forward);
    if (this.keys['KeyA'] || this.keys['ArrowLeft']) moveDir.sub(right);
    if (this.keys['KeyD'] || this.keys['ArrowRight']) moveDir.add(right);
    if (Math.abs(touchInput.moveY) > 0.01) moveDir.addScaledVector(forward, touchInput.moveY);
    if (Math.abs(touchInput.moveX) > 0.01) moveDir.addScaledVector(right, touchInput.moveX);

    if (moveDir.lengthSq() > 0) moveDir.normalize();

    this.velocity.x = moveDir.x * moveSpeed;
    this.velocity.z = moveDir.z * moveSpeed;

    if ((this.keys['Space'] || touchInput.jump) && this.onGround) {
        this.velocity.y = this.jumpForce;
        this.onGround = false;
    }

    this.velocity.y += this.gravity * dt;

    this.moveWithCollision(dt);

    this.camera.position.set(
        this.position.x,
        this.position.y + this.eyeHeight,
        this.position.z
    );
};

Game.prototype.isMobileMode = function () {
    return this.isMobile === true;
};

Game.prototype.isGameplayActive = function () {
    return this.isMobileMode() ? this.gameplayActive : this.controls.isLocked;
};

Game.prototype.syncYawPitchFromCamera = function () {
    this.yaw = this.camera.rotation.y;
    this.pitch = this.camera.rotation.x;
};

Game.prototype.applyCameraRotation = function () {
    this.pitch = Math.max(-MOBILE_PITCH_LIMIT, Math.min(MOBILE_PITCH_LIMIT, this.pitch));
    this.camera.rotation.order = 'YXZ';
    this.camera.rotation.x = this.pitch;
    this.camera.rotation.y = this.yaw;
    this.camera.rotation.z = 0;
};

Game.prototype.rotateCameraBy = function (deltaX, deltaY) {
    this.yaw -= deltaX * MOBILE_LOOK_SENSITIVITY;
    this.pitch -= deltaY * MOBILE_LOOK_SENSITIVITY;
    this.applyCameraRotation();
};

Game.prototype.setGameplayActive = function (active) {
    this.gameplayActive = active;

    const blocker = document.getElementById('blocker');
    const crosshair = document.getElementById('crosshair');
    const debugInfo = document.getElementById('debug-info');
    const hotbar = document.getElementById('hotbar');

    document.body.classList.toggle('touch-mode', this.isMobileMode() && active);

    if (active) {
        blocker.classList.add('hidden');
        crosshair.classList.add('visible');
        debugInfo.classList.add('visible');
        hotbar.classList.add('visible');
        return;
    }

    if (!this.craftingOpen && !this.equipmentOpen) {
        blocker.classList.remove('hidden');
        crosshair.classList.remove('visible');
        debugInfo.classList.remove('visible');
        hotbar.classList.remove('visible');
    } else {
        crosshair.classList.remove('visible');
    }
};

Game.prototype.getTargetedBlock = function () {
    const dir = new THREE.Vector3();
    this.camera.getWorldDirection(dir);
    return this.world.raycast(this.camera.position, dir, REACH_DISTANCE);
};

Game.prototype.performPrimaryAction = function () {
    if (!this.isGameplayActive()) return;
    const result = this.getTargetedBlock();
    if (!result.hit) return;

    const [bx, by, bz] = result.blockPos;
    this.world.setBlock(bx, by, bz, BLOCK.AIR);
    this.meshDirty = true;
    this.multiplayer.sendBlockUpdate(bx, by, bz, BLOCK.AIR);
};

Game.prototype.performSecondaryAction = function () {
    if (!this.isGameplayActive()) return;
    const result = this.getTargetedBlock();
    if (!result.hit) return;

    const [bx, by, bz] = result.blockPos;
    if (result.block === BLOCK.CRAFTING_TABLE) {
        this.openCrafting();
        return;
    }

    const [nx, ny, nz] = result.normal;
    const px = bx + nx;
    const py = by + ny;
    const pz = bz + nz;

    const pp = this.player.position;
    const pw = this.player.width;
    const playerMinX = pp.x - pw;
    const playerMaxX = pp.x + pw;
    const playerMinZ = pp.z - pw;
    const playerMaxZ = pp.z + pw;
    const playerMinY = pp.y;
    const playerMaxY = pp.y + this.player.height;

    if (px + 1 > playerMinX && px < playerMaxX &&
        py + 1 > playerMinY && py < playerMaxY &&
        pz + 1 > playerMinZ && pz < playerMaxZ) {
        return;
    }

    const blockToPlace = PLACEABLE_BLOCKS[this.selectedBlockIdx];
    this.world.setBlock(px, py, pz, blockToPlace);
    this.meshDirty = true;
    this.multiplayer.sendBlockUpdate(px, py, pz, blockToPlace);
};

Game.prototype.setupTouchControls = function () {
    if (!this.isMobileMode()) return;

    const joystick = document.getElementById('touch-joystick');
    const thumb = document.getElementById('touch-stick-thumb');
    const lookPad = document.getElementById('touch-look');
    const breakBtn = document.getElementById('touch-break');
    const placeBtn = document.getElementById('touch-place');
    const jumpBtn = document.getElementById('touch-jump');
    const sprintBtn = document.getElementById('touch-sprint');

    document.querySelectorAll('.hotbar-slot').forEach((slot, index) => {
        slot.addEventListener('click', () => this.selectBlock(index));
    });

    const updateJoystick = (clientX, clientY) => {
        const rect = joystick.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = clientX - centerX;
        const dy = clientY - centerY;
        const distance = Math.min(MOBILE_JOYSTICK_RADIUS, Math.hypot(dx, dy));
        const angle = Math.atan2(dy, dx);
        const limitedX = Math.cos(angle) * distance;
        const limitedY = Math.sin(angle) * distance;

        thumb.style.transform = `translate(${limitedX}px, ${limitedY}px)`;
        this.touchState.moveX = limitedX / MOBILE_JOYSTICK_RADIUS;
        this.touchState.moveY = -(limitedY / MOBILE_JOYSTICK_RADIUS);
    };

    const resetJoystick = () => {
        this.touchState.joystickPointerId = null;
        this.touchState.moveX = 0;
        this.touchState.moveY = 0;
        thumb.style.transform = 'translate(0, 0)';
    };

    const bindHoldButton = (element, key) => {
        const setPressed = (pressed) => {
            this.touchState[key] = pressed;
            element.classList.toggle('active', pressed);
        };

        element.addEventListener('pointerdown', (e) => {
            e.preventDefault();
            setPressed(true);
        });
        element.addEventListener('pointerup', () => setPressed(false));
        element.addEventListener('pointercancel', () => setPressed(false));
        element.addEventListener('pointerleave', () => setPressed(false));
    };

    joystick.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        joystick.setPointerCapture(e.pointerId);
        this.touchState.joystickPointerId = e.pointerId;
        updateJoystick(e.clientX, e.clientY);
    });
    joystick.addEventListener('pointermove', (e) => {
        if (this.touchState.joystickPointerId !== e.pointerId) return;
        e.preventDefault();
        updateJoystick(e.clientX, e.clientY);
    });
    joystick.addEventListener('pointerup', (e) => {
        if (this.touchState.joystickPointerId !== e.pointerId) return;
        resetJoystick();
    });
    joystick.addEventListener('pointercancel', (e) => {
        if (this.touchState.joystickPointerId !== e.pointerId) return;
        resetJoystick();
    });

    lookPad.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        lookPad.setPointerCapture(e.pointerId);
        this.touchState.lookPointerId = e.pointerId;
        this.touchState.lookLastX = e.clientX;
        this.touchState.lookLastY = e.clientY;
    });
    lookPad.addEventListener('pointermove', (e) => {
        if (this.touchState.lookPointerId !== e.pointerId || !this.isGameplayActive()) return;
        e.preventDefault();
        const dx = e.clientX - this.touchState.lookLastX;
        const dy = e.clientY - this.touchState.lookLastY;
        this.touchState.lookLastX = e.clientX;
        this.touchState.lookLastY = e.clientY;
        this.rotateCameraBy(dx, dy);
    });
    lookPad.addEventListener('pointerup', (e) => {
        if (this.touchState.lookPointerId === e.pointerId) {
            this.touchState.lookPointerId = null;
        }
    });
    lookPad.addEventListener('pointercancel', (e) => {
        if (this.touchState.lookPointerId === e.pointerId) {
            this.touchState.lookPointerId = null;
        }
    });

    bindHoldButton(jumpBtn, 'jump');
    bindHoldButton(sprintBtn, 'sprint');

    breakBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.performPrimaryAction();
    });
    placeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.performSecondaryAction();
    });
};

Game.prototype.init = function () {
    this.isMobile = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    this.gameplayActive = false;
    this.yaw = 0;
    this.pitch = 0;
    this.touchState = {
        moveX: 0,
        moveY: 0,
        sprint: false,
        jump: false,
        joystickPointerId: null,
        lookPointerId: null,
        lookLastX: 0,
        lookLastY: 0,
    };

    originalGameInit.call(this);

    this.player.game = this;
    this.renderer.domElement.style.touchAction = 'none';
    this.camera.rotation.order = 'YXZ';
    this.syncYawPitchFromCamera();
    this.setupTouchControls();
};

Game.prototype.setupHotbar = function () {
    originalGameSetupHotbar.call(this);
    document.querySelectorAll('.hotbar-slot').forEach((slot, index) => {
        slot.addEventListener('click', () => this.selectBlock(index));
    });
};

Game.prototype.setupUI = function () {
    originalGameSetupUI.call(this);

    if (!this.isMobileMode()) return;

    const blocker = document.getElementById('blocker');

    blocker.addEventListener('click', () => {
        if (!this.remoteName) return;
        if (this.craftingOpen || this.equipmentOpen) return;
        this.setGameplayActive(true);
    });

    this.controls.addEventListener('lock', () => {
        this.syncYawPitchFromCamera();
    });
};

Game.prototype.openCrafting = function () {
    if (!this.isMobileMode()) {
        originalGameOpenCrafting.call(this);
        return;
    }

    this.craftingOpen = true;
    this.setGameplayActive(false);
    document.getElementById('crafting-overlay').classList.add('visible');
    this.craftingGrid = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    this.updateCraftingDisplay();
};

Game.prototype.closeCrafting = function () {
    if (!this.isMobileMode()) {
        originalGameCloseCrafting.call(this);
        return;
    }

    this.craftingOpen = false;
    document.getElementById('crafting-overlay').classList.remove('visible');
    setTimeout(() => {
        if (!this.craftingOpen && !this.equipmentOpen) {
            this.setGameplayActive(true);
        }
    }, 100);
};

Game.prototype.openEquipment = function () {
    if (!this.isMobileMode()) {
        originalGameOpenEquipment.call(this);
        return;
    }

    this.equipmentOpen = true;
    this.setGameplayActive(false);
    document.getElementById('equipment-overlay').classList.add('visible');
    this.updateEquipmentDisplay();
};

Game.prototype.closeEquipment = function () {
    if (!this.isMobileMode()) {
        originalGameCloseEquipment.call(this);
        return;
    }

    this.equipmentOpen = false;
    document.getElementById('equipment-overlay').classList.remove('visible');
    setTimeout(() => {
        if (!this.craftingOpen && !this.equipmentOpen) {
            this.setGameplayActive(true);
        }
    }, 100);
};

Game.prototype.animate = function () {
    requestAnimationFrame(() => this.animate());

    const dt = this.clock.getDelta();

    this.player.setTouchInput(this.touchState);
    this.controls.mobileActive = this.isMobileMode() && this.gameplayActive;
    this.player.update(dt, this.controls);
    this.multiplayer.update(dt);

    if (this.meshDirty) {
        this.world.buildMesh(this.scene);
        this.meshDirty = false;
    }

    if (this.isGameplayActive()) {
        this.updateHighlight();
    }

    const pos = this.player.position;
    const blockName = BLOCK_NAMES[PLACEABLE_BLOCKS[this.selectedBlockIdx]];
    const debug = document.getElementById('debug-info');
    const stats = this.player.getStats();
    const equipLine = (stats.attack || stats.defense || stats.speedBonus)
        ? `<br>⚔${stats.attack} 🛡${stats.defense} 💨+${stats.speedBonus}%` : '';
    debug.innerHTML =
        `XYZ: ${pos.x.toFixed(1)} / ${pos.y.toFixed(1)} / ${pos.z.toFixed(1)}<br>` +
        `FPS: ${(1 / Math.max(dt, 0.001)).toFixed(0)}<br>` +
        `手持: ${blockName}` + equipLine;

    this.renderer.render(this.scene, this.camera);
};

new Game();
