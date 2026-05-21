# E-Waste Escape

E-Waste Escape is a retro pixel-art web game about electronic waste, repair, recycling, and sustainability. You play as Nova, a scavenger and repair engineer fighting through polluted tech ruins to recover recyclable devices, repair broken equipment, and restart the ancient Recycling Core.

The game runs in the browser with vanilla HTML, CSS, and JavaScript. No build step is required.

## Privacy-Focused Analytics

The site includes basic site analytics using GoatCounter. This lightweight, privacy-focused tracker helps understand visits without invasive advertising or cross-site tracking.

## Story

In the year 2145, Earth has become a graveyard of abandoned electronics. Giant corporations left behind billions of broken phones, batteries, circuit boards, and machines, poisoning the air, soil, and water.

Nova joins an underground resistance group called The Green Circuit. Their mission is to recover useful technology, recycle dangerous e-waste, repair what can still be saved, and defeat the pollution machines guarding the Recycling Core.

Across four levels, Nova must survive toxic alleys, battery graveyards, ruined repair districts, and MegaDump City before facing the Waste Titan in the final battle for Earth.

## How To Play

Your goal is to complete each level mission, survive the hazards, and defeat the boss that appears afterward.

Controls:

| Action      | Keyboard              |
| ----------- | --------------------- |
| Jump        | `Space` or `Arrow Up` |
| Double jump | Press `Space` twice   |
| Slide       | `Arrow Down` or `S`   |
| Dash        | `Shift`               |
| EMP blast   | `E`                   |
| Pause       | `P` or `Esc`          |

Gameplay basics:

- Collect recyclable electronics, batteries, repair kits, and recycling core components.
- Avoid toxic hazards, acid pools, broken machinery, enemies, and boss attacks.
- Use dash and EMP blast to escape danger and fight enemies.
- Pick up power-ups to boost Nova's abilities.
- Complete the mission target to trigger the boss fight.
- Defeat each boss to unlock the next level.

## Levels

| Level | Name              | Mission                               | Boss                |
| ----- | ----------------- | ------------------------------------- | ------------------- |
| 1     | Toxic Alley       | Collect 50 recyclable electronics     | Smoke Crusher       |
| 2     | Battery Graveyard | Collect 100 batteries safely          | Acid Core           |
| 3     | Repair District   | Repair 150 broken devices             | Obsolescence Engine |
| 4     | MegaDump City     | Collect 200 recycling core components | Waste Titan         |

## Running Locally

Because this is a static browser game, you can run it without installing dependencies.

Option 1: open the file directly

1. Clone the repository:

   ```bash
   git clone https://github.com/asher-not-king/e-waste-escape.git
   cd e-waste-escape
   ```

2. Open `index.html` in your browser.

Option 2: run a local web server

If you prefer serving the game locally, run one of these commands from the project folder:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

You can also use the Live Server extension in VS Code.

## Project Structure

```text
.
|-- index.html      Main game page and UI screens
|-- style.css       Visual design, layout, HUD, menus, and responsive styles
|-- script.js       Game engine, player, levels, enemies, bosses, scoring, and saves
|-- icon.png        Site and game icon
|-- sw.js           Service worker for static caching
|-- robots.txt      Basic crawler settings
```

## Contributing

Contributions are welcome. You can help by fixing bugs, improving performance, adding accessibility improvements, polishing the UI, balancing levels, improving educational facts, or suggesting new gameplay ideas.

Before contributing code:

1. Fork the repository.
2. Create a new branch for your change.
3. Make your edits.
4. Test the game locally in a browser.
5. Open a pull request with a clear description of what changed.

Good pull requests should include:

- What problem the change solves.
- What files or systems were changed.
- How you tested it.
- Screenshots or short recordings for visual changes, if useful.

## Reporting Issues

Use the GitHub Issues tab for:

- Bugs or crashes.
- Controls that do not work as expected.
- Layout problems on mobile or desktop.
- Balance problems, such as a level feeling too easy or too hard.
- Suggestions for new features, enemies, levels, facts, or accessibility improvements.

When reporting a bug, please include:

- What browser and device you used.
- What you were doing when the bug happened.
- What you expected to happen.
- What actually happened.
- Screenshots or console errors, if available.

## Contact

For questions, suggestions, or permission requests outside GitHub Issues, contact me through GitHub:

https://github.com/asher-not-king

## License

This project uses a custom non-commercial license. The source code is available for learning, modification, and redistribution, but the game may not be sold or used commercially without permission.

See [LICENSE.md](LICENSE.md) for details.
