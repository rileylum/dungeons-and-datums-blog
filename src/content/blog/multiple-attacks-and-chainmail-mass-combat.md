---
title: 'Multiple attacks and Chainmail mass combat'
description: 'Explore how the Chainmail mass combat system scales fighter effectiveness against multiple opponents, comparing three different attack mechanics and their impact on making high-level fighters feel truly heroic in OD&D.'
pubDate: 2025-11-03
category: 'Ramblings'
tags: ['od&d', 'combat', 'mass-combat', 'chainmail', 'house-rules']
draft: true
---

# Multiple attacks and Chainmail mass combat

I've been running an open table OD&D game with some houserules. The main one, and the subject of this post, is using the Mass Combat system from Chainmail. This is inspired by Daniel from [Bandits Keep](https://www.youtube.com/c/banditskeep) - if you're interested in seeing it in action, go check out their solo play on Youtube.

The basics: instead of rolling a d20 to hit, then d6 for damage, you roll a pool of d6's. You compare your weapon type to their armour type to determine how many dice you throw (normally your HD, or less if your weapon is worse than their armour) and what target number you need to score a hit.

There are a few reasons why I like this system and why I'm experimenting with it:
1. It's fast and simple for group combats
2. It allows fighters the ability to hit/kill many weaker combatants
3. It provides some interesting tactical choices 

## My modifications (System 2)

I've made some changes to how it's presented in Chainmail though. These changes are what I'm calling System 2 in the comparisons below.

**First change:** When a hit is scored we roll for damage (a d6) rather than just requiring a number of hits equal to HD. I also allow players to determine who will take the hit in a group, but this is before damage is rolled. This is one of the interesting choices - how does the party organise themselves and who takes the hits? It also provides the players with a fair bit of survivability against regular attacks.

**Second change:** In Chainmail, when your weapon class is lower than the armour class you throw half your hit dice or one third. This means you might need to be 2 or 3 HD to score a hit. This isn't a problem in regular Chainmail because you have a large block of units, but I'm keeping the players attacking as individuals so this becomes difficult. Instead, I have the HD/2 result increase the target number from a 6 to a 7 (requiring a 6, followed by a 4+) and the HD/3 increasing it to an 8 (6 followed by 5+). 

## Alternative system (System 3)

There is another way to handle this which is quite different, but I think is close enough to the intent of the system and the math is similar.

In this system you always roll a number of dice equal to your HD, and your target number is determined by your weapon type (ignoring the armour). So a light weapon always needs a 6, an armoured weapon (the names seem strange without the context of Chainmail) always needs a 4.

Then the opponent rolls to defend for each successful hit - light armour successfully defends on a 6 and armoured on a 4. You wouldn't roll damage in this system as you're already rolling plenty of dice.

## Comparing the systems (1 HD)

Below I've prepared tables showing the average number of hits each system would score. System 1 is regular Chainmail, System 2 is using the 7+ and 8+ instead of reducing number of attacks, and System 3 is the separate attack and defend rolls. The tables compare attack types, but the d20 system is also presented for each armour class (you can ignore the weapon types for that column).

| Attack Type | Defend Type | AC | d20 | System 1 | System 2 | System 3 |
|-------------|-------------|----|----|----------|----------|----------|
| Light | Light | 9 | 0.55 | 0.167 | 0.167 | 0.139 |
| Heavy | Light | 8 | 0.50 | 0.333 | 0.333 | 0.278 |
| Armoured | Light | 7 | 0.45 | 0.500 | 0.500 | 0.417 |
| Light | Heavy | 6 | 0.40 | 0.000 | 0.083 | 0.111 |
| Heavy | Heavy | 5 | 0.35 | 0.167 | 0.167 | 0.222 |
| Armoured | Heavy | 4 | 0.30 | 0.333 | 0.333 | 0.333 |
| Light | Armoured | 3 | 0.25 | 0.000 | 0.056 | 0.083 |
| Heavy | Armoured | 2 | 0.20 | 0.000 | 0.083 | 0.167 |
| Armoured | Armoured | 1 | 0.15 | 0.167 | 0.167 | 0.250 |

A few things to note here:

**System 1 zeros:** The obvious 0 hits for System 1 show cases where you don't have enough HD to actually roll any dice. This is a real problem for individual combatants.

**Armoured weapons vs d20:** Comparing the Armoured attack against each armour class gives very similar hits to the d20 system. However, if you aren't rolling damage for Chainmail, the effect of a hit is roughly twice that of actually rolling damage.

**System 3 variance:** While System 3 does give inconsistent numbers across the table, the numbers are similar enough to not alter the results significantly.

### Looking at the patterns

At first glance, if you squint your eyes it looks like it doesn't matter much which system you use - though light and heavy weapons are significantly more effective in the d20 system (because weapon type doesn't really exist there).

However, what if we look at what happens as HD goes up? The first time the d20 system actually changes is at 4 HD, so let's go there.

## Comparing the systems (4 HD)

| Attack Type | Defend Type | AC | d20 | System 1 | System 2 | System 3 |
|-------------|-------------|----|----|----------|----------|----------|
| Light | Light | 9 | 0.65 | 0.667 | 0.667 | 0.556 |
| Heavy | Light | 8 | 0.60 | 1.333 | 1.333 | 1.111 |
| Armoured | Light | 7 | 0.55 | 2.000 | 2.000 | 1.667 |
| Light | Heavy | 6 | 0.50 | 0.333 | 0.333 | 0.444 |
| Heavy | Heavy | 5 | 0.45 | 0.667 | 0.667 | 0.889 |
| Armoured | Heavy | 4 | 0.40 | 1.333 | 1.333 | 1.333 |
| Light | Armoured | 3 | 0.35 | 0.167 | 0.222 | 0.333 |
| Heavy | Armoured | 2 | 0.30 | 0.333 | 0.333 | 0.667 |
| Armoured | Armoured | 1 | 0.25 | 0.667 | 0.667 | 1.000 |

### The scaling difference

Here's where things get interesting. The d20 system goes up by 0.1 in all categories (owing to the +2 on the hit tables). Meanwhile, the Chainmail systems all go up 4x (except for the cases in System 1 which were originally 0s).

This scaling difference is the key advantage of the Chainmail approach - higher HD combatants become dramatically more effective at dealing with multiple weaker opponents, while the d20 system scales much more gradually. 

## A Review

Okay so remember why I wanted to use this system in the first place - let's review each point individually.

### It's fast

I can tell you from experience - it is fast. However, I think this is more to do with the group style combat than the d6 system. It does make it quicker when the players know the target and can skip the back and forth and just tell me the damage, but you can just tell the PCs the AC in the d20 system too.

The main speed improvements come from the players acting all at the same time, not worrying about precise positioning and target selection (these things are still possible, but only when they're actually relevant). This could be done with any combat system. However, if you add many figures like henchmen, it can be quicker because it's typically easier to roll a handful of d6s, pick the successful ones up and roll them again (or skip damage) than using many d20s - though not a huge difference.

**The group AC problem:** There is one significant difference though - calculating a group AC. For monsters this is pretty easy, they'll often have identical ACs anyway. For PCs they'll often have very different ACs, and this often slows down my actions as a GM. I'm often rolling many attacks and needing to decide where they go.

The group combat means I can roll them all together and let the players work it out for me. This is done by averaging the party's defend value, which is easy when there are only 3 types. But when there are 10 or more possible AC values and the groups can be changing frequently, calculating this becomes difficult. So you'd need to come up with a system to speed this up to match the speed the Chainmail system achieves. Use the highest AC? The lowest? Somewhere in the middle? Or actually calculate it? 

### It provides interesting tactical choices

Again this comes from the group combat nature. How the group is organized and who is taking the hits are the main new choices, as opposed to treating each PC individually. So this is certainly achievable with either combat system.

### Fighters scoring multiple hits/kills

This is very important to me, and this is where we see the stark difference between the two systems emerge. The adventure literature that I read often has depictions of high-level fighters cleaving through multiple opponents in quick succession. This happens in the d20 system, but often over many rounds rather than all at once.

Does the d6 Chainmail system actually do this though? Yeah, a little bit - scoring between 2 and 4 times more hits on average at 4HD. But even still, the best result is only 2 hits on average against an unarmoured or lightly armoured opponent with a 2-handed weapon. Not quite the fiction I was hoping to emulate.

**An interesting observation:** We could apply this same scaling to the d20 system. Rolling multiple d6s for damage has the same scaling effect. Maybe the Black Hack was onto something after all.

## Other considerations

### Weapon vs Armour

This is the other clear difference between the systems, but we have tools for this already if it's important to you. Seven Voyages of Zylarthen has already done the conversion from the Man-to-Man Chainmail system to the d20 if you want it.

## Conclusions

So does the Chainmail system achieve the goals I wanted it to? Yes it does. I've found it very intuitive, fast and effective. Speed is very important to me, especially on the GM side which I find can slow things down significantly - I have other things to be worrying about than rolling the attacks. Maybe I'm just not as experienced as I could be though. But it turns my combat turns into a few seconds of rolling and then a quick description, which is great. I can also focus on description rather than the back and forth of regular combat. Again, maybe this is a player experience thing as well.

**The Fighter problem:** Other than speed, the important aspect is making the Fighter actually effective and modelling the fiction that I imagine when I think of the Fighter. While it certainly does this better than the d20 system, it's not quite there. There are early play reports from Blackmoor where Fighters are killing multiple creatures in a single turn, which just isn't likely to happen even at relatively high levels with this system.

**The community consideration:** Lastly, a lot of my focus at the moment is creating a community through the Discord and Convention and getting new players into the hobby and interested in OD&D. So is this system too different from what the expectation is? I think it might be. A new player is almost certainly not going to know what I'm talking about when I'm referencing Chainmail, and they're almost certainly expecting to be rolling a d20 vs AC - that's the experience they'll get if they go to another table, so I should probably be giving that to them. Additionally, there's an overhead to running this system: converting armour and weapon types to the Chainmail system, and adjudicating strange monsters like Green Slime.

## Potential Changes

Here are some ideas I'm considering for making Fighters more effective at dealing with multiple weaker opponents:

**Option 1: Scaling damage dice**
Some sort of scaling damage dice at least for the Fighter is worth looking into. Is 1d6 per HD too much? It is if I apply it to monsters - the players are likely to face 3-4HD monsters at level 1 and there's no way they're surviving 4d6 damage, especially if that is meant to spread to multiple targets.

Maybe an extra die per heroic class: 1d6 for Normal, 2d6 for Hero, 3d6 for Superhero. This definitely improves the Fighter but they won't be cleaving through many targets this way.

**Option 2: Traditional cleave**
I tend not to like the typical cleave rule, which is to make an additional attack if you get a kill. It's slow - after each attack the GM needs to determine if a creature was killed, then the process starts again.

**Option 3: AD&D style multiple attacks**
AD&D gives multiple attacks against 1HD creatures - that's a possibility worth considering.

**Option 4: Damage-as-kills**
I think the most ambitious change I could make would be a Fighter-only ability once they reach Hero: they kill a number of 1HD creatures equal to their damage result. So a roll of 3 on the d6 would kill 3 targets.

This would need to scale so that eventually they have this effect on 2 and 3 HD creatures as well. It doesn't tie in well with the multiple damage dice from Option 1 though - I think killing an average of 7 1HD creatures at 4th level is too much.

## Final thoughts

The Chainmail mass combat experiment has been valuable, and I'll continue it especially to make sure I'm testing some higher levels and more complicated combats. However, I think I'll look at transitioning back to the regular d20 system and making some changes to the Fighter class to test some of the above changes. I'll need to think further on exactly how I would implement those changes, and how I can make group combat work jsut as quickly with some of the small challenges that the d20 system presents.
