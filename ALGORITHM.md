# Deterministic Wish Selection Algorithm

This document explains how the "nice" mini-app selects wishes deterministically.

## Overview

The app uses the **FNV-1a (Fowler-Noll-Vo) hash algorithm** to deterministically select a daily wish for each user. This ensures:

1. **Same wish all day**: Each user sees the same wish throughout the entire day
2. **Different wish daily**: The wish changes at midnight (based on date)
3. **User-specific**: Different users see different wishes on the same day
4. **Stateless**: No database or storage needed - everything is computed on-the-fly

## How It Works

### Input Format

The algorithm takes two pieces of information:
- **FID** (Farcaster ID): Unique identifier for the user
- **Date**: Current date in YYYY-MM-DD format

These are combined into a string: `${fid}-${YYYY-MM-DD}`

Example: `12345-2024-01-15`

### FNV-1a Hash Algorithm

FNV-1a is a non-cryptographic hash function chosen for its:
- **Speed**: Very fast to compute
- **Simplicity**: Easy to implement and understand
- **Distribution**: Good distribution of hash values
- **Consistency**: Same input always produces same output

#### Implementation

```typescript
function fnv1aHash(str: string): number {
  let hash = 2166136261; // FNV offset basis (32-bit)
  
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i); // XOR with byte
    hash = Math.imul(hash, 16777619); // Multiply by FNV prime
  }
  
  return hash >>> 0; // Convert to unsigned 32-bit integer
}
```

**Constants:**
- `2166136261`: FNV-1a offset basis (32-bit)
- `16777619`: FNV prime (32-bit)

### Wish Selection

Once we have the hash value, we use modulo arithmetic to map it to a wish index:

```typescript
wishIndex = hash % wishesCount
```

This ensures the index is always within the valid range `[0, wishesCount-1]`.

## Example

Let's walk through a complete example:

**Given:**
- User FID: `12345`
- Date: `2024-01-15`
- Total wishes: `25`

**Step 1: Create input string**
```
input = "12345-2024-01-15"
```

**Step 2: Compute FNV-1a hash**
```
hash = fnv1aHash("12345-2024-01-15")
// Let's say this returns: 2847561293
```

**Step 3: Map to wish index**
```
wishIndex = 2847561293 % 25 = 18
```

**Result:** User sees wish at index 18

### Tomorrow

The next day (2024-01-16), the same user would get:

```
input = "12345-2024-01-16"
hash = fnv1aHash("12345-2024-01-16")  // Different hash!
wishIndex = hash % 25  // Different index!
```

## Properties

### Determinism
- Same FID + same date = same wish ✅
- No randomness involved
- No external dependencies

### Distribution
- FNV-1a provides good distribution
- Each wish has roughly equal probability of selection
- No bias towards any particular wish

### Performance
- O(n) where n is string length (very small in our case)
- No network calls
- No database lookups
- Instant computation

### Privacy
- User's FID never leaves the client
- No tracking or data collection
- Completely stateless

## Why FNV-1a?

We chose FNV-1a over other options because:

1. **Simple**: Easy to implement and audit
2. **Fast**: Faster than cryptographic hashes (SHA-256, etc.)
3. **Non-cryptographic**: We don't need cryptographic security
4. **Established**: Well-known algorithm with proven properties
5. **Consistent**: Same implementation across languages/platforms

## Limitations

### Hash Collisions

While rare, it's theoretically possible for:
- Different FID+date combinations to produce the same hash
- Multiple users to see the same wish on the same day (intended)
- Same wish to appear on consecutive days (possible but unlikely)

These are acceptable for our use case since:
- We're not doing security-sensitive operations
- Minor collisions don't affect user experience
- Statistical distribution is more important than perfect uniqueness

## Testing

The implementation includes tests to verify:
- Consistency: Same input produces same output
- Distribution: Different inputs produce different outputs
- Range: Output is always within valid bounds
- Date sensitivity: Different dates produce different results
- User sensitivity: Different FIDs produce different results

Run tests with:
```bash
npm test
```

## References

- [FNV Hash on Wikipedia](https://en.wikipedia.org/wiki/Fowler%E2%80%93Noll%E2%80%93Vo_hash_function)
- [FNV-1a Algorithm Specification](http://www.isthe.com/chongo/tech/comp/fnv/)
