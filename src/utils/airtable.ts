import { Gift, GiftStatus } from "@/interfaces/gifts";
import Airtable, { Attachment } from "airtable";

export const submitGiftToAirtable = async (gift: Gift, email: string): Promise<string | void> => {
  if (process.env.NEXT_PUBLIC_AIRTABLE_DISABLED) return
  const base = new Airtable({ apiKey: process.env.NEXT_PUBLIC_AIRTABLE_TOKEN }).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE || '')

  let userID: string
  try {
    userID = await getUserIDByEmail(email)
  } catch (err) {
    return new Promise<string>((_, reject) => reject('Error getting user by email, make sure you RSVPd!'))
  }

  if (!userID) {
    return new Promise<string>((_, reject) => reject('Guest not found, make sure you RSVPd!'))
  }

  return new Promise<void>((resolve, reject) => {
    base('Gifts').update([  
      {
        'id': gift.id,
        'fields': {
          'Status': GiftStatus.Claimed,
          'Claimed By': [userID],
        },
      },
    ], function(err) {
      if (err) {
        reject('Error updating gift');
        return;
      }
      resolve();
    });
  })
}

export const getGiftsFromAirtable = async (): Promise<Gift[]> => {
  if (process.env.NEXT_PUBLIC_AIRTABLE_DISABLED) return [
    {
      id: '1',
      name: 'Toaster',
      description: "A nice toaster that shows the demo",
      cost: 19.98,
      picture: "https://www.kitchenaid.ca/is/image/content/dam/global/kitchenaid/countertop-appliance/toaster/images/hero-KMT2115SX.tif?$PRODUCT-FEATURE$&fmt=webp-alpha",
      link: "https://www.kitchenaid.ca/en_ca/countertop-appliances/toasters/two-slice/p.2-slice-toaster-with-manual-lift-lever.kmt2115sx.html",
      status: GiftStatus.NotClaimed
    }
  ]

  const base = new Airtable({ apiKey: process.env.NEXT_PUBLIC_AIRTABLE_TOKEN }).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE || '')

  return new Promise<Gift[]>((resolve, reject) => {
    const gifts: Gift[] = []

    base('Gifts')
      .select({
        view: 'Master List',
      })
      .eachPage(
        function page(records, fetchNextPage) {
          if (!records) {
            return
          }

          records.forEach(function (record) {
            gifts.push({
              id: record.id,
              name: record.get('Gift Name') as string,
              description: record.get('Description') as string,
              cost: record.get('Cost') as number,
              picture: (record.get('Picture') as Attachment[])[0].url,
              link: record.get('Link') as string,
              status: record.get('Status') as GiftStatus,
            })
          })

          fetchNextPage()
        },
        function done(err) {
          if (err) {
            reject(err)
            return
          }
          resolve(gifts)
        }
      )
  })
}

const getUserIDByEmail = async (email: string): Promise<string> => {
  if (process.env.NEXT_PUBLIC_AIRTABLE_DISABLED) return ''

  const base = new Airtable({ apiKey: process.env.NEXT_PUBLIC_AIRTABLE_TOKEN }).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE || '')

  return new Promise<string>((resolve, reject) => {
    base('Guests')
      .select({
        maxRecords: 1,
        filterByFormula: `{Email}='${email}'`,
      })
      .eachPage(
        function page(records, fetchNextPage) {
          if (!records) {
            return
          }

          records.forEach(function (record) {
            resolve(record.id)
          })

          fetchNextPage()
        },
        function done(err) {
          if (err) {
            reject(err)
            return
          }
          resolve('')
        }
      )
  })
}