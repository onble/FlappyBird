{
  "_$ver": 1,
  "_$id": "lx8mwule",
  "_$type": "Scene",
  "left": 0,
  "right": 0,
  "top": 0,
  "bottom": 0,
  "name": "Scene2D",
  "_$comp": [
    {
      "_$type": "cda64fda-dce1-4dd1-99a0-3c0c48dbc52e",
      "scriptPath": "../src/GameRoot.ts"
    }
  ],
  "_$child": [
    {
      "_$id": "pkm9o51q",
      "_$type": "Sprite",
      "name": "bg1",
      "width": 2048,
      "height": 1024,
      "texture": {
        "_$uuid": "975cef66-7304-49d5-8a7d-5bb33d39d721",
        "_$type": "Texture"
      },
      "_$comp": [
        {
          "_$type": "RigidBody",
          "type": "kinematic"
        },
        {
          "_$type": "96f488b6-a38f-4c07-8c10-0e9e67b5c0c3",
          "scriptPath": "../src/AutoMove.ts"
        },
        {
          "_$type": "db946373-234e-4561-9c85-fd74c07e1dd3",
          "scriptPath": "../src/RepeatingBg.ts"
        }
      ]
    },
    {
      "_$id": "c40gvev7",
      "_$type": "Sprite",
      "name": "bg2",
      "x": 2048,
      "width": 2048,
      "height": 1024,
      "texture": {
        "_$uuid": "975cef66-7304-49d5-8a7d-5bb33d39d721",
        "_$type": "Texture"
      },
      "_$comp": [
        {
          "_$type": "RigidBody",
          "type": "kinematic"
        },
        {
          "_$type": "96f488b6-a38f-4c07-8c10-0e9e67b5c0c3",
          "scriptPath": "../src/AutoMove.ts"
        },
        {
          "_$type": "db946373-234e-4561-9c85-fd74c07e1dd3",
          "scriptPath": "../src/RepeatingBg.ts"
        }
      ]
    },
    {
      "_$id": "at5gy220",
      "_$type": "Sprite",
      "name": "ground1",
      "y": 568,
      "width": 2048,
      "height": 512,
      "texture": {
        "_$uuid": "471fb503-345d-4745-9a60-7b6f3f892a3f",
        "_$type": "Texture"
      },
      "_$comp": [
        {
          "_$type": "RigidBody",
          "type": "kinematic"
        },
        {
          "_$type": "96f488b6-a38f-4c07-8c10-0e9e67b5c0c3",
          "scriptPath": "../src/AutoMove.ts"
        },
        {
          "_$type": "db946373-234e-4561-9c85-fd74c07e1dd3",
          "scriptPath": "../src/RepeatingBg.ts"
        },
        {
          "_$type": "BoxCollider",
          "y": 270,
          "width": 2048,
          "height": 242
        }
      ]
    },
    {
      "_$id": "e943tql3",
      "_$type": "Sprite",
      "name": "ground2",
      "x": 2048,
      "y": 568,
      "width": 2048,
      "height": 512,
      "texture": {
        "_$uuid": "471fb503-345d-4745-9a60-7b6f3f892a3f",
        "_$type": "Texture"
      },
      "_$comp": [
        {
          "_$type": "RigidBody",
          "type": "kinematic"
        },
        {
          "_$type": "96f488b6-a38f-4c07-8c10-0e9e67b5c0c3",
          "scriptPath": "../src/AutoMove.ts"
        },
        {
          "_$type": "db946373-234e-4561-9c85-fd74c07e1dd3",
          "scriptPath": "../src/RepeatingBg.ts"
        },
        {
          "_$type": "BoxCollider",
          "y": 270,
          "width": 2048,
          "height": 242
        }
      ]
    },
    {
      "_$id": "y0yfzbbt",
      "_$type": "Sprite",
      "name": "bird",
      "x": 130,
      "y": 372,
      "width": 128,
      "height": 128,
      "texture": {
        "_$uuid": "898ba90a-cfb2-41f2-8cf5-48f7a5edb1ac",
        "_$type": "Texture"
      },
      "_$comp": [
        {
          "_$type": "RigidBody"
        },
        {
          "_$type": "BoxCollider",
          "x": 25,
          "y": 42,
          "width": 63,
          "height": 51
        }
      ]
    }
  ]
}