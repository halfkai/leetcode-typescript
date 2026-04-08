class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

export function addTwoNumbers (l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const dummyHead = new ListNode(0);
  let current = dummyHead;
  let carry = 0;
  while (l1 || l2 || carry) {
    const sum = (l1?.val ?? 0) + (l2?.val ?? 0) + carry;
    carry = sum / 10 | 0;
    current.next = new ListNode(sum % 10);
    current = current.next;
    l1 = l1?.next ?? null;
    l2 = l2?.next ?? null;
  }
  return dummyHead.next;
}


// to simplify the problem, use number[] to represent ListNode
export function addTwoNumbersArray(
  l1: number[] | null,
  l2: number[] | null,
): number[] {
  let carry = 0;
  let dummy = [];
  if (!l1) l1 = [];
  if (!l2) l2 = [];
  for (let i = 0; i < Math.max(l1.length, l2.length); i++) {
    const x = l1[i] ?? 0;
    const y = l2[i] ?? 0;
    const sum = x + y + carry;
    carry = sum / 10 | 0;
    dummy.push(sum % 10);
  }
  if (carry > 0) dummy.push(carry);
  return dummy;
}
