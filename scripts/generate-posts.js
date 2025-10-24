#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_DIR = path.join(__dirname, '../src/content/blog');
const NUM_POSTS = parseInt(process.argv[2]) || 20;

const categories = [
  'Character Analysis',
  'Game Mechanics',
  'Data Science',
  'Campaign Planning',
  'Probability & Statistics',
  'World Building',
];

const tags = [
  'D&D',
  'statistics',
  'probability',
  'character-optimization',
  'dice',
  'combat',
  'magic',
  'analysis',
  'visualization',
  'python',
  'R',
  'pandas',
  'ggplot2',
  'machine-learning',
  'simulation',
];

const titles = [
  'Analyzing Critical Hit Probabilities in Combat',
  'The Mathematics Behind Advantage and Disadvantage',
  'Optimizing Spell Selection Using Data Science',
  'Character Build Optimization: A Statistical Approach',
  'Predicting Combat Outcomes with Monte Carlo Simulation',
  'The Expected Value of Different Damage Die',
  'Visualizing Character Progression Paths',
  'A/B Testing Different Party Compositions',
  'Machine Learning for DM Decision Making',
  'The Statistics of Random Encounters',
  'Analyzing Save or Suck Spell Effectiveness',
  'Hit Point Distribution Across Classes',
  'The Probability of TPK: A Data-Driven Analysis',
  'Modeling Initiative Order Probabilities',
  'Economic Modeling in Fantasy Worlds',
  'Clustering Character Archetypes',
  'The Math Behind Bounded Accuracy',
  'Analyzing Monster CR vs Party Level',
  'Statistical Analysis of Dice Rolling Apps',
  'Predicting Player Behavior with Data',
];

const descriptions = [
  'A deep dive into the statistical implications of this game mechanic.',
  'Exploring how data science can improve your tabletop experience.',
  'An analysis of the mathematical foundations behind this concept.',
  'Using probability theory to optimize your gameplay.',
  'A statistical examination of common game scenarios.',
  'Leveraging data analysis for better game mastering.',
  'Quantifying the impact of character choices.',
  'A computational approach to tabletop gaming.',
  'Exploring the intersection of RPGs and statistics.',
  'Data-driven insights for better decision making.',
];

const previews = [
  'This article explores how understanding probability distributions can fundamentally change your approach to character optimization and combat strategy. We analyze real game session data to uncover patterns that most players never notice.',
  'Through extensive data collection and statistical analysis, we examine how different game mechanics interact in ways that affect your success rate at the table. Discover insights that can make you a more effective player or dungeon master.',
  'Using Monte Carlo simulations and probability theory, we break down complex game mechanics into understandable patterns. Learn how mathematical analysis can reveal the hidden mathematics behind your favorite tabletop moments.',
  'By combining traditional statistical methods with modern data science techniques, we investigate what really works in actual play. Our findings may surprise you and change how you approach the game.',
  'This comprehensive analysis uses data from hundreds of game sessions to examine common assumptions about game balance and optimal strategy. We provide actionable insights backed by rigorous statistical analysis.',
  'Leveraging advanced analytics and visualization techniques, we explore the mathematical foundations that govern game outcomes. See how data-driven decision making can enhance your tabletop gaming experience.',
  'Drawing from both game theory and practical experience, we quantify the impact of different choices on overall game performance. Our research provides concrete numbers to back up commonly debated topics.',
  'Through careful experimentation and simulation, we test various strategies to determine which approaches actually provide the best results. The data reveals some counterintuitive truths about optimal play.',
  'We examine this topic through multiple analytical lenses, from basic probability to advanced statistical modeling. This multifaceted approach provides deeper insights than traditional rule-of-thumb guidance.',
  'Using rigorous data analysis and visualization, we transform abstract game mechanics into concrete, actionable intelligence. Learn how to apply these insights to improve your gaming sessions.',
];

const contentTemplates = [
  `# Introduction

In this post, we'll explore the fascinating intersection of tabletop gaming and data science.

## The Problem

Many players and DMs struggle with understanding the underlying probabilities that govern game mechanics.

## Methodology

We used a combination of statistical analysis and simulation to investigate this question.

### Data Collection

We gathered data from over 1000 game sessions to ensure statistical significance.

### Analysis

Using Python and pandas, we analyzed the following:

- Distribution of outcomes
- Expected values
- Variance and standard deviation
- Correlation with other factors

## Results

Our analysis revealed some surprising insights:

1. **Key Finding 1**: The first major discovery about the mechanics
2. **Key Finding 2**: Another interesting pattern we observed
3. **Key Finding 3**: An unexpected correlation in the data

## Conclusion

Understanding these probabilities can help you make more informed decisions at the table.`,

  `# Overview

This analysis examines a common scenario in tabletop gaming from a statistical perspective.

## Background

The question has long been debated in the gaming community, but rarely with hard data to back up claims.

## Experimental Design

We designed a Monte Carlo simulation to test various scenarios:

\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

# Simulation parameters
num_trials = 10000
results = []

for trial in range(num_trials):
    # Simulation logic here
    pass
\`\`\`

## Data Analysis

After running 10,000 simulations, we analyzed the results using descriptive statistics.

### Visualizations

The data clearly shows an interesting pattern when plotted as a histogram.

## Discussion

These findings have practical implications for gameplay and character building.

## Future Research

Further investigation could explore additional variables and edge cases.`,

  `# Introduction

Let's examine this game mechanic through the lens of probability theory.

## Theory

The mathematical foundation for this analysis comes from basic probability principles.

## Practical Applications

1. **Character Building**: How to use this information when creating characters
2. **Combat Strategy**: Tactical implications during encounters
3. **DM Planning**: Balancing encounters using these insights

## Case Study

We examined a typical 4th level party facing a CR 6 encounter.

The results showed that:
- Party success rate: 73%
- Average rounds of combat: 5.2
- Probability of character death: 12%

## Recommendations

Based on our analysis, we recommend the following approaches for optimal play.

## Conclusion

Data-driven decision making can enhance your tabletop gaming experience without removing the fun.`,
];

function randomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomElements(arr, count) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generatePost(index) {
  const title = titles[index % titles.length];
  const description = randomElement(descriptions);
  const preview = randomElement(previews);
  const category = randomElement(categories);
  const postTags = randomElements(tags, Math.floor(Math.random() * 3) + 2);
  const content = randomElement(contentTemplates);

  // Generate random date within last 6 months
  const now = new Date();
  const sixMonthsAgo = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
  const randomTime = sixMonthsAgo.getTime() + Math.random() * (now.getTime() - sixMonthsAgo.getTime());
  const pubDate = new Date(randomTime).toISOString().split('T')[0];

  const isDraft = Math.random() < 0.1; // 10% chance of being a draft

  const frontmatter = `---
title: '${title}'
description: '${description}'
preview: >
  ${preview}
pubDate: ${pubDate}
category: '${category}'
tags: [${postTags.map(tag => `'${tag}'`).join(', ')}]
draft: ${isDraft}
---

${content}
`;

  return frontmatter;
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

console.log(`Generating ${NUM_POSTS} example blog posts...`);

for (let i = 0; i < NUM_POSTS; i++) {
  const title = titles[i % titles.length];
  const slug = slugify(title);
  const filename = `example-${i + 1}-${slug}.md`;
  const filepath = path.join(BLOG_DIR, filename);
  const content = generatePost(i);

  fs.writeFileSync(filepath, content);
  console.log(`Created: ${filename}`);
}

console.log(`\n✅ Successfully generated ${NUM_POSTS} example posts!`);
console.log(`📁 Location: src/content/blog/`);
console.log(`🧹 Run 'npm run cleanup-posts' to remove all example posts`);
