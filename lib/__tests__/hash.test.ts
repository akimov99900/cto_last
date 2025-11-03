import { fnv1aHash, getDeterministicWishIndex } from "../hash";

describe("FNV-1a Hash Function", () => {
  test("fnv1aHash returns consistent results for same input", () => {
    const input = "12345-2024-01-01";
    const hash1 = fnv1aHash(input);
    const hash2 = fnv1aHash(input);
    expect(hash1).toBe(hash2);
  });

  test("fnv1aHash returns different results for different inputs", () => {
    const hash1 = fnv1aHash("12345-2024-01-01");
    const hash2 = fnv1aHash("12345-2024-01-02");
    expect(hash1).not.toBe(hash2);
  });

  test("getDeterministicWishIndex returns consistent results", () => {
    const fid = 12345;
    const date = new Date("2024-01-01");
    const wishesCount = 25;

    const index1 = getDeterministicWishIndex(fid, date, wishesCount);
    const index2 = getDeterministicWishIndex(fid, date, wishesCount);

    expect(index1).toBe(index2);
  });

  test("getDeterministicWishIndex returns valid index", () => {
    const fid = 12345;
    const date = new Date("2024-01-01");
    const wishesCount = 25;

    const index = getDeterministicWishIndex(fid, date, wishesCount);

    expect(index).toBeGreaterThanOrEqual(0);
    expect(index).toBeLessThan(wishesCount);
  });

  test("getDeterministicWishIndex changes with date", () => {
    const fid = 12345;
    const date1 = new Date("2024-01-01");
    const date2 = new Date("2024-01-02");
    const wishesCount = 25;

    const index1 = getDeterministicWishIndex(fid, date1, wishesCount);
    const index2 = getDeterministicWishIndex(fid, date2, wishesCount);

    // While theoretically they could be the same due to hash collision,
    // it's extremely unlikely with different dates
    expect(index1).not.toBe(index2);
  });

  test("getDeterministicWishIndex produces different hashes for different FIDs", () => {
    const fid1 = 12345;
    const fid2 = 54321;
    const date = new Date("2024-01-01");

    const hash1 = fnv1aHash(`${fid1}-${date.toISOString().split('T')[0]}`);
    const hash2 = fnv1aHash(`${fid2}-${date.toISOString().split('T')[0]}`);

    expect(hash1).not.toBe(hash2);
  });

  test("getDeterministicWishIndex works with various FIDs", () => {
    const date = new Date("2024-01-01");
    const wishesCount = 25;
    const fids = [123, 456, 789, 1011, 1234567];

    fids.forEach(fid => {
      const index = getDeterministicWishIndex(fid, date, wishesCount);
      expect(index).toBeGreaterThanOrEqual(0);
      expect(index).toBeLessThan(wishesCount);
    });
  });
});
