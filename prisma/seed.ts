import { PrismaClient, ContactStatus, PropertyStatus, DealStatus, TransactionType } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting Nexus OS Seed (Local/Demo Mode Only)')

  // 1. Create Sample CRM Contacts
  const contact1 = await prisma.contact.upsert({
    where: { email: 'houssein@nexus.com' },
    update: {},
    create: {
      firstName: 'Houssein',
      lastName: 'Salloum',
      email: 'houssein@nexus.com',
      phone: '+961 70 123456',
      status: ContactStatus.PROSPECT,
      isVip: true,
      notes: 'Strategic partner for Gulf expansion.',
    },
  })

  // 2. Create Sample Real Estate Assets
  const property1 = await prisma.property.create({
    data: {
      title: 'Penthouse Marina Tower',
      address: 'Beirut Waterfront, Plot 42',
      price: 2450000,
      type: 'RESIDENTIAL',
      status: PropertyStatus.AVAILABLE,
      sqm: 450,
      bedrooms: 4,
    }
  })

  // 3. Create Sample Deal
  const deal1 = await prisma.deal.create({
    data: {
      title: 'Marina Penthouse Acquisition',
      value: 2450000,
      stage: 'NEGOTIATION',
      status: DealStatus.PIPELINE,
      contactId: contact1.id,
      propertyId: property1.id,
    }
  })

  // 4. Create Sample Transactions
  await prisma.transaction.create({
    data: {
      amount: 12000,
      type: TransactionType.INCOME,
      category: 'CONSULTATION',
      description: 'Q1 Strategic Consultation Fee',
      contactId: contact1.id,
    }
  })

  console.log('✅ Seed Completed Successfully')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
