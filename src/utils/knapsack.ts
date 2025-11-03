import { Product } from "@/data/products";

export interface KnapsackResult {
  selectedProducts: Product[];
  totalValue: number;
  totalPrice: number;
  algorithmName: string;
  executionTime: number;
}

/**
 * Greedy Knapsack Algorithm
 * Selects items based on value-to-price ratio (highest first)
 * Time Complexity: O(n log n)
 */
export function greedyKnapsack(products: Product[], budget: number): KnapsackResult {
  const startTime = performance.now();
  
  // Calculate value-to-price ratio for each product
  const itemsWithRatio = products.map(product => ({
    ...product,
    ratio: product.value / product.price
  }));
  
  // Sort by ratio in descending order
  itemsWithRatio.sort((a, b) => b.ratio - a.ratio);
  
  const selectedProducts: Product[] = [];
  let totalPrice = 0;
  let totalValue = 0;
  
  // Greedily select items
  for (const item of itemsWithRatio) {
    if (totalPrice + item.price <= budget) {
      selectedProducts.push(item);
      totalPrice += item.price;
      totalValue += item.value;
    }
  }
  
  const executionTime = performance.now() - startTime;
  
  return {
    selectedProducts,
    totalValue,
    totalPrice,
    algorithmName: "Greedy (Value/Price Ratio)",
    executionTime
  };
}

/**
 * 0/1 Knapsack using Dynamic Programming
 * Classic DP solution with space optimization
 * Time Complexity: O(n * budget)
 * Space Complexity: O(budget)
 */
export function zeroOneKnapsack(products: Product[], budget: number): KnapsackResult {
  const startTime = performance.now();
  
  const n = products.length;
  
  // DP array where dp[w] represents max value achievable with budget w
  const dp: number[] = new Array(budget + 1).fill(0);
  
  // Track which items are selected
  const selected: boolean[][] = Array(n + 1).fill(null).map(() => 
    new Array(budget + 1).fill(false)
  );
  
  // Fill DP table
  for (let i = 0; i < n; i++) {
    const { price, value } = products[i];
    
    // Traverse budget in reverse to avoid using same item twice
    for (let w = budget; w >= price; w--) {
      if (dp[w - price] + value > dp[w]) {
        dp[w] = dp[w - price] + value;
        selected[i + 1][w] = true;
      }
    }
  }
  
  // Backtrack to find selected items
  const selectedProducts: Product[] = [];
  let remainingBudget = budget;
  
  for (let i = n; i > 0; i--) {
    if (selected[i][remainingBudget]) {
      selectedProducts.push(products[i - 1]);
      remainingBudget -= products[i - 1].price;
    }
  }
  
  const totalPrice = selectedProducts.reduce((sum, p) => sum + p.price, 0);
  const totalValue = dp[budget];
  const executionTime = performance.now() - startTime;
  
  return {
    selectedProducts,
    totalValue,
    totalPrice,
    algorithmName: "0/1 Knapsack (DP)",
    executionTime
  };
}

/**
 * Full Dynamic Programming Knapsack with Backtracking
 * Complete DP solution with full table construction
 * Time Complexity: O(n * budget)
 * Space Complexity: O(n * budget)
 */
export function dpKnapsack(products: Product[], budget: number): KnapsackResult {
  const startTime = performance.now();
  
  const n = products.length;
  
  // Create 2D DP table
  const dp: number[][] = Array(n + 1).fill(null).map(() => 
    new Array(budget + 1).fill(0)
  );
  
  // Fill DP table
  for (let i = 1; i <= n; i++) {
    const { price, value } = products[i - 1];
    
    for (let w = 0; w <= budget; w++) {
      if (price <= w) {
        // Max of: not taking item vs taking item
        dp[i][w] = Math.max(
          dp[i - 1][w],
          dp[i - 1][w - price] + value
        );
      } else {
        // Can't take this item
        dp[i][w] = dp[i - 1][w];
      }
    }
  }
  
  // Backtrack to find selected items
  const selectedProducts: Product[] = [];
  let i = n;
  let w = budget;
  
  while (i > 0 && w > 0) {
    // If value comes from including this item
    if (dp[i][w] !== dp[i - 1][w]) {
      selectedProducts.push(products[i - 1]);
      w -= products[i - 1].price;
    }
    i--;
  }
  
  const totalPrice = selectedProducts.reduce((sum, p) => sum + p.price, 0);
  const totalValue = dp[n][budget];
  const executionTime = performance.now() - startTime;
  
  return {
    selectedProducts,
    totalValue,
    totalPrice,
    algorithmName: "Dynamic Programming (Full)",
    executionTime
  };
}

/**
 * Compare all three algorithms and return results
 */
export function compareAlgorithms(products: Product[], budget: number): KnapsackResult[] {
  return [
    greedyKnapsack(products, budget),
    zeroOneKnapsack(products, budget),
    dpKnapsack(products, budget)
  ];
}

/**
 * Get the best result based on total value
 */
export function getBestResult(results: KnapsackResult[]): KnapsackResult {
  return results.reduce((best, current) => 
    current.totalValue > best.totalValue ? current : best
  );
}
