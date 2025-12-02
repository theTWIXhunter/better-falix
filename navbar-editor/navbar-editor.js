let config = {
  serverPages: { sections: [] },
  otherPages: { sections: [] }
};

// Default configurations
const DEFAULT_CONFIGS = {
  server: {
    sections: [
      {
        name: 'Console & Files',
        expanded: true,
        hideHeader: true,
        items: [
          {
            name: 'Console',
            url: '/server/console',
            iconPath: 'M9.4 86.6C-3.1 74.1-3.1 53.9 9.4 41.4s32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L178.7 256 9.4 86.6zM256 416l288 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-288 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z',
            iconViewBox: '0 0 576 512'
          },
          {
            name: 'File Manager',
            url: '/server/filemanager',
            iconPath: 'M88.7 223.8L0 375.8 0 96C0 60.7 28.7 32 64 32l117.5 0c17 0 33.3 6.7 45.3 18.7l26.5 26.5c12 12 28.3 18.7 45.3 18.7L416 96c35.3 0 64 28.7 64 64l0 32-336 0c-22.8 0-43.8 12.1-55.3 31.8zm27.6 16.1C122.1 230 132.6 224 144 224l400 0c11.5 0 22 6.1 27.7 16.1s5.7 22.2-.1 32.1l-112 192C453.9 474 443.4 480 432 480L32 480c-11.5 0-22-6.1-27.7-16.1s-5.7-22.2 .1-32.1l112-192z',
            iconViewBox: '0 0 576 512'
          }
        ]
      },
      {
        name: 'Minecraft',
        expanded: false,
        items: [
          {
            name: 'Worlds',
            url: '/server/worlds',
            iconPath: 'M57.7 193l9.4 16.4c8.3 14.5 21.9 25.2 38 29.8L163 255.7c17.2 4.9 29 20.6 29 38.5l0 39.9c0 11 6.2 21 16 25.9s16 14.9 16 25.9l0 39c0 15.6 14.9 26.9 29.9 22.6c16.1-4.6 28.6-17.5 32.7-33.8l2.8-11.2c4.2-16.9 15.2-31.4 30.3-40l8.1-4.6c15-8.5 24.2-24.5 24.2-41.7l0-8.3c0-12.7-5.1-24.9-14.1-33.9l-3.9-3.9c-9-9-21.2-14.1-33.9-14.1L257 256c-11.1 0-22.1-2.9-31.8-8.4l-34.5-19.7c-4.3-2.5-7.6-6.5-9.2-11.2c-3.2-9.6 1.1-20 10.2-24.5l5.9-3c6.6-3.3 14.3-3.9 21.3-1.5l23.2 7.7c8.2 2.7 17.2-.4 21.9-7.5c4.7-7 4.2-16.3-1.2-22.8l-13.6-16.3c-10-12-9.9-29.5 .3-41.3l15.7-18.3c8.8-10.3 10.2-25 3.5-36.7l-2.4-4.2c-3.5-.2-6.9-.3-10.4-.3C163.1 48 84.4 108.9 57.7 193zM464 256c0-36.8-9.6-71.4-26.4-101.5L412 164.8c-15.7 6.3-23.8 23.8-18.5 39.8l16.9 50.7c3.5 10.4 12 18.3 22.6 20.9l29.1 7.3c1.2-9 1.8-18.2 1.8-27.5zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z'
          },
          {
            name: 'Players',
            url: '/server/players',
            iconPath: 'M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192l42.7 0c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0L21.3 320C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7l42.7 0C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3l-213.3 0zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352l117.3 0C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7l-330.7 0c-14.7 0-26.7-11.9-26.7-26.7z',
            iconViewBox: '0 0 640 512'
          },
          {
            name: 'Config',
            url: '/server/properties',
            iconPath: 'M512 416c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96C0 60.7 28.7 32 64 32l128 0c20.1 0 39.1 9.5 51.2 25.6l19.2 25.6c6 8.1 15.5 12.8 25.6 12.8l160 0c35.3 0 64 28.7 64 64l0 256zM368.6 259.9c6.3-3.6 9.5-11.1 6.8-18c-2.1-5.5-4.6-10.8-7.4-15.9l-2.3-4c-3.1-5.1-6.5-9.9-10.2-14.5c-4.6-5.7-12.7-6.7-19-3l-2.9 1.7c-9.2 5.3-20.4 4-29.6-1.3s-16.1-14.5-16.1-25.1l0-3.4c0-7.3-4.9-13.8-12.1-14.9c-6.5-1-13.1-1.5-19.9-1.5s-13.4 .5-19.9 1.5c-7.2 1.1-12.1 7.6-12.1 14.9l0 3.4c0 10.6-6.9 19.8-16.1 25.1s-20.4 6.6-29.6 1.3l-2.9-1.7c-6.3-3.6-14.4-2.6-19 3c-3.7 4.6-7.1 9.5-10.2 14.6l-2.3 3.9c-2.8 5.1-5.3 10.4-7.4 15.9c-2.6 6.8 .5 14.3 6.8 18l2.9 1.7c9.2 5.3 13.7 15.8 13.7 26.4s-4.5 21.1-13.7 26.4l-3 1.7c-6.3 3.6-9.5 11.1-6.8 17.9c2.1 5.5 4.6 10.7 7.4 15.8l2.4 4.1c3.1 5.1 6.4 9.9 10.1 14.5c4.6 5.7 12.7 6.7 19 3l2.9-1.7c9.2-5.3 20.4-4 29.6 1.3s16.1 14.5 16.1 25.1l0 3.4c0 7.3 4.9 13.8 12.1 14.9c6.5 1 13.1 1.5 19.9 1.5s13.4-.5 19.9-1.5c7.2-1.1 12.1-7.6 12.1-14.9l0-3.4c0-10.6 6.9-19.8 16.1-25.1s20.4-6.6 29.6-1.3l2.9 1.7c6.3 3.6 14.4 2.6 19-3c3.7-4.6 7.1-9.4 10.1-14.5l2.4-4.2c2.8-5.1 5.3-10.3 7.4-15.8c2.6-6.8-.5-14.3-6.8-17.9l-3-1.7c-9.2-5.3-13.7-15.8-13.7-26.4s4.5-21.1 13.7-26.4l3-1.7zM216 288a40 40 0 1 1 80 0 40 40 0 1 1 -80 0z'
          },
          {
            name: 'Addons',
            url: '/server/plugins',
            iconPath: 'M192 104.8c0-9.2-5.8-17.3-13.2-22.8C167.2 73.3 160 61.3 160 48c0-26.5 28.7-48 64-48s64 21.5 64 48c0 13.3-7.2 25.3-18.8 34c-7.4 5.5-13.2 13.6-13.2 22.8c0 12.8 10.4 23.2 23.2 23.2l56.8 0c26.5 0 48 21.5 48 48l0 56.8c0 12.8 10.4 23.2 23.2 23.2c9.2 0 17.3-5.8 22.8-13.2c8.7-11.6 20.7-18.8 34-18.8c26.5 0 48 28.7 48 64s-21.5 64-48 64c-13.3 0-25.3-7.2-34-18.8c-5.5-7.4-13.6-13.2-22.8-13.2c-12.8 0-23.2 10.4-23.2 23.2L384 464c0 26.5-21.5 48-48 48l-56.8 0c-12.8 0-23.2-10.4-23.2-23.2c0-9.2 5.8-17.3 13.2-22.8c11.6-8.7 18.8-20.7 18.8-34c0-26.5-28.7-48-64-48s-64 21.5-64 48c0 13.3 7.2 25.3 18.8 34c7.4 5.5 13.2 13.6 13.2 22.8c0 12.8-10.4 23.2-23.2 23.2L48 512c-26.5 0-48-21.5-48-48L0 343.2C0 330.4 10.4 320 23.2 320c9.2 0 17.3 5.8 22.8 13.2C54.7 344.8 66.7 352 80 352c26.5 0 48-28.7 48-64s-21.5-64-48-64c-13.3 0-25.3 7.2-34 18.8C40.5 250.2 32.4 256 23.2 256C10.4 256 0 245.6 0 232.8L0 176c0-26.5 21.5-48 48-48l120.8 0c12.8 0 23.2-10.4 23.2-23.2z'
          }
        ]
      },
      {
        name: 'Server Settings',
        expanded: false,
        items: [
          {
            name: 'Logs',
            url: '/server/logs',
            iconPath: 'M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0 128 128 0L256 0zM112 256l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z',
            iconViewBox: '0 0 384 512'
          },
          {
            name: 'Network',
            url: '/server/subdomains',
            iconPath: 'M352 256c0 22.2-1.2 43.6-3.3 64l-185.3 0c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64l185.3 0c2.2 20.4 3.3 41.8 3.3 64zm28.8-64l123.1 0c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64l-123.1 0c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32l-116.7 0c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0l-176.6 0c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0L18.6 160C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192l123.1 0c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64L8.1 320C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6l176.6 0c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352l116.7 0zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6l116.7 0z'
          },
          {
            name: 'Backups',
            url: '/server/backups',
            iconPath: 'M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-242.7c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32L64 32zm0 96c0-17.7 14.3-32 32-32l192 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32L96 224c-17.7 0-32-14.3-32-32l0-64zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z',
            iconViewBox: '0 0 448 512'
          },
          {
            name: 'Monitoring',
            url: '/server/monitor',
            iconPath: 'M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64L0 400c0 44.2 35.8 80 80 80l400 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 416c-8.8 0-16-7.2-16-16L64 64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z'
          },
          {
            name: 'Schedules',
            url: '/server/schedules',
            iconPath: 'M96 32l0 32L48 64C21.5 64 0 85.5 0 112l0 48 448 0 0-48c0-26.5-21.5-48-48-48l-48 0 0-32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 32L160 64l0-32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192L0 192 0 464c0 26.5 21.5 48 48 48l352 0c26.5 0 48-21.5 48-48l0-272z',
            iconViewBox: '0 0 448 512'
          },
          {
            name: 'Subusers',
            url: '/server/subusers',
            iconPath: 'M144 160A80 80 0 1 0 144 0a80 80 0 1 0 0 160zm368 0A80 80 0 1 0 512 0a80 80 0 1 0 0 160zM0 298.7C0 310.4 9.6 320 21.3 320l213.3 0c.2 0 .4 0 .7 0c-26.6-23.5-43.3-57.8-43.3-96c0-7.6 .7-15 1.9-22.3c-13.6-6.3-28.7-9.7-44.6-9.7l-42.7 0C47.8 192 0 239.8 0 298.7zM320 320c24 0 45.9-8.8 62.7-23.3c2.5-3.7 5.2-7.3 8-10.7c2.7-3.3 5.7-6.1 9-8.3C410 262.3 416 243.9 416 224c0-53-43-96-96-96s-96 43-96 96s43 96 96 96zm65.4 60.2c-10.3-5.9-18.1-16.2-20.8-28.2l-103.2 0C187.7 352 128 411.7 128 485.3c0 14.7 11.9 26.7 26.7 26.7l300.6 0c-2.1-5.2-3.2-10.9-3.2-16.4l0-3c-1.3-.7-2.7-1.5-4-2.3l-2.6 1.5c-16.8 9.7-40.5 8-54.7-9.7c-4.5-5.6-8.6-11.5-12.4-17.6l-.1-.2-.1-.2-2.4-4.1-.1-.2-.1-.2c-3.4-6.2-6.4-12.6-9-19.3c-8.2-21.2 2.2-42.6 19-52.3l2.7-1.5c0-.8 0-1.5 0-2.3s0-1.5 0-2.3l-2.7-1.5zM533.3 192l-42.7 0c-15.9 0-31 3.5-44.6 9.7c1.3 7.2 1.9 14.7 1.9 22.3c0 17.4-3.5 33.9-9.7 49c2.5 .9 4.9 2 7.1 3.3l2.6 1.5c1.3-.8 2.6-1.6 4-2.3l0-3c0-19.4 13.3-39.1 35.8-42.6c7.9-1.2 16-1.9 24.2-1.9s16.3 .6 24.2 1.9c22.5 3.5 35.8 23.2 35.8 42.6l0 3c1.3 .7 2.7 1.5 4 2.3l2.6-1.5c16.8-9.7 40.5-8 54.7 9.7c2.3 2.8 4.5 5.8 6.6 8.7c-2.1-57.1-49-102.7-106.6-102.7zm91.3 163.9c6.3-3.6 9.5-11.1 6.8-18c-2.1-5.5-4.6-10.8-7.4-15.9l-2.3-4c-3.1-5.1-6.5-9.9-10.2-14.5c-4.6-5.7-12.7-6.7-19-3l-2.9 1.7c-9.2 5.3-20.4 4-29.6-1.3s-16.1-14.5-16.1-25.1l0-3.4c0-7.3-4.9-13.8-12.1-14.9c-6.5-1-13.1-1.5-19.9-1.5s-13.4 .5-19.9 1.5c-7.2 1.1-12.1 7.6-12.1 14.9l0 3.4c0 10.6-6.9 19.8-16.1 25.1s-20.4 6.6-29.6 1.3l-2.9-1.7c-6.3-3.6-14.4-2.6-19 3c-3.7 4.6-7.1 9.5-10.2 14.6l-2.3 3.9c-2.8 5.1-5.3 10.4-7.4 15.9c-2.6 6.8 .5 14.3 6.8 17.9l2.9 1.7c9.2 5.3 13.7 15.8 13.7 26.4s-4.5 21.1-13.7 26.4l-3 1.7c-6.3 3.6-9.5 11.1-6.8 17.9c2.1 5.5 4.6 10.7 7.4 15.8l2.4 4.1c3 5.1 6.4 9.9 10.1 14.5c4.6 5.7 12.7 6.7 19 3l2.9-1.7c9.2-5.3 20.4-4 29.6 1.3s16.1 14.5 16.1 25.1l0 3.4c0 7.3 4.9 13.8 12.1 14.9c6.5 1 13.1 1.5 19.9 1.5s13.4-.5 19.9-1.5c7.2-1.1 12.1-7.6 12.1-14.9l0-3.4c0-10.6 6.9-19.8 16.1-25.1s20.4-6.6 29.6-1.3l2.9 1.7c6.3 3.6 14.4 2.6 19-3c3.7-4.6 7.1-9.4 10.1-14.5l2.4-4.2c2.8-5.1 5.3-10.3 7.4-15.8c2.6-6.8-.5-14.3-6.8-17.9l-3-1.7c-9.2-5.3-13.7-15.8-13.7-26.4s4.5-21.1 13.7-26.4l3-1.7zM472 384a40 40 0 1 1 80 0 40 40 0 1 1 -80 0z',
            iconViewBox: '0 0 640 512'
          },
          {
            name: 'Activity',
            url: '/server/activity',
            iconPath: 'M40 48C26.7 48 16 58.7 16 72l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24L40 48zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zM16 232l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0z'
          },
          {
            name: 'Settings',
            url: '/server/settings',
            iconPath: 'M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z'
          }
        ]
      },
      {
        name: 'Advanced',
        expanded: false,
        items: [
          {
            name: 'Databases',
            url: '/server/databases',
            iconPath: 'M448 80l0 48c0 44.2-100.3 80-224 80S0 172.2 0 128L0 80C0 35.8 100.3 0 224 0S448 35.8 448 80zM393.2 214.7c20.8-7.4 39.9-16.9 54.8-28.6L448 288c0 44.2-100.3 80-224 80S0 332.2 0 288L0 186.1c14.9 11.8 34 21.2 54.8 28.6C99.7 230.7 159.5 240 224 240s124.3-9.3 169.2-25.3zM0 346.1c14.9 11.8 34 21.2 54.8 28.6C99.7 390.7 159.5 400 224 400s124.3-9.3 169.2-25.3c20.8-7.4 39.9-16.9 54.8-28.6l0 85.9c0 44.2-100.3 80-224 80S0 476.2 0 432l0-85.9z',
            iconViewBox: '0 0 448 512'
          },
          {
            name: 'SFTP',
            url: '/server/sftp',
            iconPath: 'M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128l-368 0zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39L296 392c0 13.3 10.7 24 24 24s24-10.7 24-24l0-134.1 39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z',
            iconViewBox: '0 0 640 512'
          },
          {
            name: 'Importer',
            url: '/server/importer',
            iconPath: 'M128 64c0-35.3 28.7-64 64-64L352 0l0 128c0 17.7 14.3 32 32 32l128 0 0 288c0 35.3-28.7 64-64 64l-256 0c-35.3 0-64-28.7-64-64l0-112 174.1 0-39 39c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l39 39L128 288l0-224zm0 224l0 48L24 336c-13.3 0-24-10.7-24-24s10.7-24 24-24l104 0zM512 128l-128 0L384 0 512 128z'
          }
        ]
      },
      {
        name: 'Support',
        expanded: false,
        items: [
          {
            name: 'Support Tickets (Admin)',
            url: '/admin/ListTickets',
            iconPath: 'M96 96l0 48c0 8.8 7.4 15.7 15.7 18.6C130.5 169.1 144 187 144 208s-13.5 38.9-32.3 45.4C103.4 256.3 96 263.2 96 272l0 48c0 35.3 28.7 64 64 64l416 0c35.3 0 64-28.7 64-64l0-48c0-8.8-7.4-15.7-15.7-18.6C605.5 246.9 592 229 592 208s13.5-38.9 32.3-45.4c8.3-2.9 15.7-9.8 15.7-18.6l0-48c0-35.3-28.7-64-64-64L160 32c-35.3 0-64 28.7-64 64zm416 32l-288 0 0 160 288 0 0-160zM224 96l288 0c17.7 0 32 14.3 32 32l0 160c0 17.7-14.3 32-32 32l-288 0c-17.7 0-32-14.3-32-32l0-160c0-17.7 14.3-32 32-32zM48 120c0-13.3-10.7-24-24-24S0 106.7 0 120L0 360c0 66.3 53.7 120 120 120l400 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-400 0c-39.8 0-72-32.2-72-72l0-240z',
            iconViewBox: '0 0 640 512'
          },
          {
            name: 'My Tickets',
            url: '/support/',
            iconPath: 'M96 96l0 48c0 8.8 7.4 15.7 15.7 18.6C130.5 169.1 144 187 144 208s-13.5 38.9-32.3 45.4C103.4 256.3 96 263.2 96 272l0 48c0 35.3 28.7 64 64 64l416 0c35.3 0 64-28.7 64-64l0-48c0-8.8-7.4-15.7-15.7-18.6C605.5 246.9 592 229 592 208s13.5-38.9 32.3-45.4c8.3-2.9 15.7-9.8 15.7-18.6l0-48c0-35.3-28.7-64-64-64L160 32c-35.3 0-64 28.7-64 64zm416 32l-288 0 0 160 288 0 0-160zM224 96l288 0c17.7 0 32 14.3 32 32l0 160c0 17.7-14.3 32-32 32l-288 0c-17.7 0-32-14.3-32-32l0-160c0-17.7 14.3-32 32-32zM48 120c0-13.3-10.7-24-24-24S0 106.7 0 120L0 360c0 66.3 53.7 120 120 120l400 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-400 0c-39.8 0-72-32.2-72-72l0-240z',
            iconViewBox: '0 0 640 512'
          },
          {
            name: 'Open Ticket',
            url: '/support/openticket',
            iconPath: 'M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z',
            iconViewBox: '0 0 448 512'
          },
          {
            name: 'Knowledge Base',
            url: '#',
            iconPath: 'M96 0C43 0 0 43 0 96L0 416c0 53 43 96 96 96l288 0 32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-64c17.7 0 32-14.3 32-32l0-320c0-17.7-14.3-32-32-32L384 0 96 0zm0 384l256 0 0 64L96 448c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16l192 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-192 0c-8.8 0-16-7.2-16-16zm16 48l192 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-192 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z',
            iconViewBox: '0 0 448 512'
          }
        ]
      }
    ]
  },
  other: {
    sections: [
      {
        name: 'Servers',
        expanded: true,
        items: [
          { 
            name: 'Servers', 
            url: '/', 
            iconPath: 'M40 48C26.7 48 16 58.7 16 72l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24L40 48zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zM16 232l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0z'
          },
          { 
            name: 'Create Server', 
            url: '/create', 
            iconPath: 'M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z'
          }
        ]
      },
      {
        name: 'Account',
        expanded: false,
        items: [
          { 
            name: 'Settings', 
            url: '/profile/settings', 
            iconPath: 'M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z'
          },
          { 
            name: 'Sessions', 
            url: '/profile/sessions', 
            iconPath: 'M128 0C92.7 0 64 28.7 64 64l0 224-44.8 0C8.6 288 0 296.6 0 307.2C0 349.6 34.4 384 76.8 384L352 384l0-96-224 0 0-224 320 0 0 32 64 0 0-32c0-35.3-28.7-64-64-64L128 0zM448 448l0-256 128 0 0 256-128 0zM384 176l0 288c0 26.5 21.5 48 48 48l160 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48l-160 0c-26.5 0-48 21.5-48 48z',
            iconViewBox: '0 0 640 512'
          },
          { 
            name: 'Activity', 
            url: '/profile/activity', 
            iconPath: 'M75 75L41 41C25.9 25.9 0 36.6 0 57.9L0 168c0 13.3 10.7 24 24 24l110.1 0c21.4 0 32.1-25.9 17-41l-30.8-30.8C155 85.5 203 64 256 64c106 0 192 86 192 192s-86 192-192 192c-40.8 0-78.6-12.7-109.7-34.4c-14.5-10.1-34.4-6.6-44.6 7.9s-6.6 34.4 7.9 44.6C151.2 495 201.7 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C185.3 0 121.3 28.7 75 75zm181 53c-13.3 0-24 10.7-24 24l0 104c0 6.4 2.5 12.5 7 17l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-65-65 0-94.1c0-13.3-10.7-24-24-24z'
          },
          { 
            name: 'Logout', 
            url: '/logout', 
            iconPath: 'M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z'
          }
        ]
      },
      {
        name: 'Support',
        expanded: false,
        items: [
          { 
            name: 'Support Tickets (Admin)', 
            url: '/admin/ListTickets', 
            iconPath: 'M96 96l0 48c0 8.8 7.4 15.7 15.7 18.6C130.5 169.1 144 187 144 208s-13.5 38.9-32.3 45.4C103.4 256.3 96 263.2 96 272l0 48c0 35.3 28.7 64 64 64l416 0c35.3 0 64-28.7 64-64l0-48c0-8.8-7.4-15.7-15.7-18.6C605.5 246.9 592 229 592 208s13.5-38.9 32.3-45.4c8.3-2.9 15.7-9.8 15.7-18.6l0-48c0-35.3-28.7-64-64-64L160 32c-35.3 0-64 28.7-64 64zm416 32l-288 0 0 160 288 0 0-160zM224 96l288 0c17.7 0 32 14.3 32 32l0 160c0 17.7-14.3 32-32 32l-288 0c-17.7 0-32-14.3-32-32l0-160c0-17.7 14.3-32 32-32zM48 120c0-13.3-10.7-24-24-24S0 106.7 0 120L0 360c0 66.3 53.7 120 120 120l400 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-400 0c-39.8 0-72-32.2-72-72l0-240z',
            iconViewBox: '0 0 640 512'
          },
          { 
            name: 'My Tickets', 
            url: '/support/', 
            iconPath: 'M96 96l0 48c0 8.8 7.4 15.7 15.7 18.6C130.5 169.1 144 187 144 208s-13.5 38.9-32.3 45.4C103.4 256.3 96 263.2 96 272l0 48c0 35.3 28.7 64 64 64l416 0c35.3 0 64-28.7 64-64l0-48c0-8.8-7.4-15.7-15.7-18.6C605.5 246.9 592 229 592 208s13.5-38.9 32.3-45.4c8.3-2.9 15.7-9.8 15.7-18.6l0-48c0-35.3-28.7-64-64-64L160 32c-35.3 0-64 28.7-64 64zm416 32l-288 0 0 160 288 0 0-160zM224 96l288 0c17.7 0 32 14.3 32 32l0 160c0 17.7-14.3 32-32 32l-288 0c-17.7 0-32-14.3-32-32l0-160c0-17.7 14.3-32 32-32zM48 120c0-13.3-10.7-24-24-24S0 106.7 0 120L0 360c0 66.3 53.7 120 120 120l400 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-400 0c-39.8 0-72-32.2-72-72l0-240z',
            iconViewBox: '0 0 640 512'
          },
          { 
            name: 'Open Ticket', 
            url: '/support/openticket', 
            iconPath: 'M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z',
            iconViewBox: '0 0 448 512'
          },
          { 
            name: 'Knowledge Base', 
            url: 'https://kb.falixnodes.net', 
            target: '_blank',
            iconPath: 'M96 0C43 0 0 43 0 96L0 416c0 53 43 96 96 96l288 0 32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-64c17.7 0 32-14.3 32-32l0-320c0-17.7-14.3-32-32-32L384 0 96 0zm0 384l256 0 0 64L96 448c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16l192 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-192 0c-8.8 0-16-7.2-16-16zm16 48l192 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-192 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z',
            iconViewBox: 'M0 0h384v512H0z'
          }
        ]
      }
    ]
  }
};

let currentPageType = 'server';
let currentConfig = null;
let editingSection = null;
let editingItem = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadConfigs();
  setupEventListeners();
});

function loadConfigs() {
  chrome.storage.local.get(['navbarConfigServer', 'navbarConfigOther'], (result) => {
    const toSave = {};
    
    if (!result.navbarConfigServer) {
      toSave.navbarConfigServer = DEFAULT_CONFIGS.server;
    }
    if (!result.navbarConfigOther) {
      toSave.navbarConfigOther = DEFAULT_CONFIGS.other;
    }
    
    if (Object.keys(toSave).length > 0) {
      chrome.storage.local.set(toSave, () => {
        renderSections(currentPageType);
      });
    } else {
      renderSections(currentPageType);
    }
  });
}

function setupEventListeners() {
  // Tab switching
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      const tabName = e.target.dataset.tab;
      switchTab(tabName);
    });
  });

  // Action buttons
  document.addEventListener('click', (e) => {
    const action = e.target.closest('[data-action]')?.dataset.action;
    if (!action) return;

    switch (action) {
      case 'add-section':
        addSection(e.target.dataset.pageType);
        break;
      case 'edit-section':
        editSection(e.target.dataset.sectionIndex);
        break;
      case 'delete-section':
        deleteSection(e.target.dataset.sectionIndex);
        break;
      case 'add-item':
        addItem(e.target.dataset.sectionIndex);
        break;
      case 'edit-item':
        editItem(e.target.dataset.sectionIndex, e.target.dataset.itemIndex);
        break;
      case 'delete-item':
        deleteItem(e.target.dataset.sectionIndex, e.target.dataset.itemIndex);
        break;
      case 'close-section-modal':
        closeSectionModal();
        break;
      case 'save-section-modal':
        saveSectionModal();
        break;
      case 'close-item-modal':
        closeItemModal();
        break;
      case 'save-item-modal':
        saveItemModal();
        break;
      case 'reset':
        resetToDefault();
        break;
    }
  });
}

function switchTab(tabName) {
  console.log('[navbar-editor] switchTab called with:', tabName);
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  
  document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
  document.getElementById(tabName).classList.add('active');
  
  currentPageType = tabName === 'server-pages' ? 'server' : 'other';
  console.log('[navbar-editor] currentPageType set to:', currentPageType);
  renderSections(currentPageType);
}

function renderSections(pageType) {
  const configKey = `navbarConfig${pageType === 'server' ? 'Server' : 'Other'}`;
  console.log('[navbar-editor] renderSections called with pageType:', pageType, 'configKey:', configKey);
  
  chrome.storage.local.get([configKey], (result) => {
    console.log('[navbar-editor] Storage get result:', result);
    currentConfig = result[configKey] || DEFAULT_CONFIGS[pageType];
    console.log('[navbar-editor] Current config loaded:', currentConfig);
    
    // If config was loaded from defaults, save it
    if (!result[configKey]) {
      console.log('[navbar-editor] No config found, saving defaults');
      chrome.storage.local.set({ [configKey]: currentConfig }, () => {
        console.log('[navbar-editor] Defaults saved successfully');
      });
    }
    
    const container = document.getElementById(`${pageType === 'server' ? 'server' : 'other'}-sections`);
    container.innerHTML = '';
    
    currentConfig.sections.forEach((section, sIndex) => {
      container.appendChild(createSectionElement(section, sIndex));
    });
  });
}

function createSectionElement(section, sIndex) {
  const div = document.createElement('div');
  div.className = 'section';
  div.innerHTML = `
    <div class="section-header">
      <span class="drag-handle">☰</span>
      <span class="section-title">${section.name}</span>
      <div class="section-actions">
        <button class="btn btn-sm btn-secondary" data-action="add-item" data-section-index="${sIndex}">+ Item</button>
        <button class="btn btn-sm btn-secondary" data-action="edit-section" data-section-index="${sIndex}">Edit</button>
        <button class="btn btn-sm btn-danger" data-action="delete-section" data-section-index="${sIndex}">Delete</button>
      </div>
    </div>
    <div class="items">
      ${section.items.map((item, iIndex) => `
        <div class="item">
          <span class="drag-handle">☰</span>
          <div class="item-info">
            <div class="item-name">${item.name}</div>
            <div class="item-url">${item.url}</div>
          </div>
          <button class="btn btn-sm btn-secondary" data-action="edit-item" data-section-index="${sIndex}" data-item-index="${iIndex}">Edit</button>
          <button class="btn btn-sm btn-danger" data-action="delete-item" data-section-index="${sIndex}" data-item-index="${iIndex}">Delete</button>
        </div>
      `).join('')}
    </div>
  `;
  return div;
}

function addSection(pageType) {
  editingSection = { index: -1, pageType };
  document.getElementById('sectionModalTitle').textContent = 'Add Category';
  document.getElementById('sectionName').value = '';
  document.getElementById('sectionExpanded').checked = true;
  document.getElementById('sectionHideHeader').checked = false;
  document.getElementById('sectionModal').classList.add('active');
}

function editSection(index) {
  editingSection = { index: parseInt(index), pageType: currentPageType };
  const section = currentConfig.sections[index];
  document.getElementById('sectionModalTitle').textContent = 'Edit Category';
  document.getElementById('sectionName').value = section.name;
  document.getElementById('sectionExpanded').checked = section.expanded;
  document.getElementById('sectionHideHeader').checked = section.hideHeader || false;
  document.getElementById('sectionModal').classList.add('active');
}

function deleteSection(index) {
  if (!confirm('Delete this category?')) return;
  currentConfig.sections.splice(parseInt(index), 1);
  saveConfig();
}

function saveSectionModal() {
  const name = document.getElementById('sectionName').value.trim();
  const expanded = document.getElementById('sectionExpanded').checked;
  const hideHeader = document.getElementById('sectionHideHeader').checked;
  
  if (!name) return;
  
  if (editingSection.index === -1) {
    currentConfig.sections.push({ name, expanded, hideHeader, items: [] });
  } else {
    currentConfig.sections[editingSection.index].name = name;
    currentConfig.sections[editingSection.index].expanded = expanded;
    currentConfig.sections[editingSection.index].hideHeader = hideHeader;
  }
  
  saveConfig(true);
  closeSectionModal();
}

function closeSectionModal() {
  document.getElementById('sectionModal').classList.remove('active');
  editingSection = null;
}

function addItem(sectionIndex) {
  editingItem = { sectionIndex: parseInt(sectionIndex), itemIndex: -1 };
  document.getElementById('itemModalTitle').textContent = 'Add Item';
  document.getElementById('itemName').value = '';
  document.getElementById('itemUrl').value = '';
  document.getElementById('itemIconPath').value = '';
  document.getElementById('itemIconViewBox').value = '0 0 512 512';
  document.getElementById('itemTarget').value = '';
  document.getElementById('itemModal').classList.add('active');
}

function editItem(sectionIndex, itemIndex) {
  editingItem = { sectionIndex: parseInt(sectionIndex), itemIndex: parseInt(itemIndex) };
  const item = currentConfig.sections[sectionIndex].items[itemIndex];
  document.getElementById('itemModalTitle').textContent = 'Edit Item';
  document.getElementById('itemName').value = item.name;
  document.getElementById('itemUrl').value = item.url;
  document.getElementById('itemIconPath').value = item.iconPath;
  document.getElementById('itemIconViewBox').value = item.iconViewBox || '0 0 512 512';
  document.getElementById('itemTarget').value = item.target || '';
  document.getElementById('itemModal').classList.add('active');
}

function deleteItem(sectionIndex, itemIndex) {
  if (!confirm('Delete this item?')) return;
  currentConfig.sections[sectionIndex].items.splice(parseInt(itemIndex), 1);
  saveConfig();
}

function saveItemModal() {
  const name = document.getElementById('itemName').value.trim();
  const url = document.getElementById('itemUrl').value.trim();
  const iconPath = document.getElementById('itemIconPath').value.trim();
  const iconViewBox = document.getElementById('itemIconViewBox').value.trim();
  const target = document.getElementById('itemTarget').value.trim();
  
  if (!name || !url || !iconPath) return;
  
  const item = { name, url, iconPath };
  if (iconViewBox && iconViewBox !== '0 0 512 512') item.iconViewBox = iconViewBox;
  if (target) item.target = target;
  
  if (editingItem.itemIndex === -1) {
    currentConfig.sections[editingItem.sectionIndex].items.push(item);
  } else {
    currentConfig.sections[editingItem.sectionIndex].items[editingItem.itemIndex] = item;
  }
  
  saveConfig();
  closeItemModal();
}

function closeItemModal() {
  document.getElementById('itemModal').classList.remove('active');
  editingItem = null;
}

function saveConfig(silent = false) {
  const configKey = `navbarConfig${currentPageType === 'server' ? 'Server' : 'Other'}`;
  console.log('[navbar-editor] Saving config:', configKey, currentConfig);
  chrome.storage.local.set({ [configKey]: currentConfig }, () => {
    console.log('[navbar-editor] Config saved successfully');
    if (!silent) {
      renderSections(currentPageType);
    }
  });
}

function resetToDefault() {
  if (!confirm('Reset to default navbar configuration?')) return;
  chrome.storage.local.set({
    navbarConfigServer: DEFAULT_CONFIGS.server,
    navbarConfigOther: DEFAULT_CONFIGS.other
  }, () => {
    loadConfigs();
  });
}
